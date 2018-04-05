'use strict';

// 3rd party libs
const { red, magenta, blue } = require("chalk");

const assert = require('assert');

const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');
const { Database } = require('sqlite3').verbose();
const db = new Database(path.join(__dirname, '..', 'bangazon.sqlite'));
require('console.table');

prompt.message = colors.blue("Bangazon Corp");

/*
  CONTROLLERS
*/
const promptAddCustomer = require('./controllers/addCustomerCtrl')
const promptActivateCustomer = require('./controllers/activateCustomerCtrl')
const { generatePaymentOptions, promptCompleteOrder, paymentTypeSchema } = require('./controllers/completeOrderCtrl');
const promptAddCustomerProduct = require('./controllers/addCustomerProductCtrl');
const { promptPaymentType } = require('./controllers/addPaymentTypeCtrl')
const pressEnterToContinue = require('./controllers/pressEnterToContinue')

/*
  MODELS
*/
const { checkForOrder, getCustomerPaymentTypes, sumOrderTotal, checkForProducts } = require('./models/completeOrder');
const getCustomers = require('./models/GetCustomers');
const addCustomer = require('./models/AddCustomer');
const addCustomerProduct = require('./models/AddCustomerProduct');
const { addCustomerPaymentType } = require('./models/AddPaymentType');
const getStaleProducts = require('./models/GetStaleProducts');

/*
  ACTIVE CUSTOMER
*/
const { setActiveCustomer, getActiveCustomer, isActiveCustomerSet } = require('../app/activeCustomer');

const addSpace = (object, properties) => {
  assert.equal(Array.isArray(properties), true);

  for (let prop of properties) {
    if (typeof object[prop] !== 'undefined') {

      // To convert value to string to allow padstart
      object[prop] = `${object[prop]}`;

      object[prop] = object[prop].padStart(object[prop].length + 2, " ");
    }
  }

  return object;
};

/*
  START OF CLI
*/
prompt.start();

const mainMenuHandler = (err, { choice }) => {

  switch (Number(choice)) {

    // Create Customer
    case 1: {
      promptAddCustomer()
        .then(custData => {
          addCustomer(custData)
          .then(custID=>{
            console.log(`\n${blue(custData.name + ' added to line ' + custID.id)}`)
            displayWelcome();
          });
        });
      break;
    }

    // Activate Customer
    case 2: {
      getCustomers().then(customers => {

        // List of customer ids
        for (let customer of customers) {
          customer = addSpace(customer, ['id']);
          console.log(`${customer.id}.`, customer.name);
        }
        promptActivateCustomer(customers.length)
          .then(({ customerId }) => {
            const customer = customers.find(({ id }) => +id === +customerId);

            setActiveCustomer(+customer.id, customer.name);
            displayWelcome();
          });
      });
      break;
    }

    // Add Payment Type
    case 3: {
      //check if active customer
      if (getActiveCustomer().id) {
        promptPaymentType().then((paymentData) => {
          addCustomerPaymentType(getActiveCustomer(), paymentData);
          displayWelcome();
        })
      } else {
        console.log('Please choose active customer before adding a payment');
        displayWelcome();
      }
      break;
    }

      case 4: {
          if(getActiveCustomer().id){
            promptAddCustomerProduct()
            .then((productData) => {
              addCustomerProduct(getActiveCustomer(), productData)
              .then(lineNum=>{
                console.log(`\n${blue(productData.title + ' added to line ' + lineNum.id)}`)
                displayWelcome();
              });
            });
            break;
          } else {
            console.log(`\n${red('PLEASE SELECT A CUSTOMER (#2) THEN RETURN TO THIS COMMAND')}`);
            displayWelcome();
          }
        }

    // Complete Order
    case 5: {
      let active = getActiveCustomer().id;
      if (active === null) {
        console.log(' Please activate a customer with the main menu');
        displayWelcome()
      } else {
        checkForOrder(active)
          .then(orders => {
            if (orders.length === 0) {
              console.log(" Please add some products to your order first. Returning to main menu.");
              displayWelcome();
            } else {
              let nullOrders = []
              for (let i = 0; i < orders.length; i++) {
                if (orders[i].payment_type === null) {
                  nullOrders.push(orders[i]);
                }
              }
              if (nullOrders.length === 0) {
                console.log(" Please add some products to your order first. Returning to main menu.")
                displayWelcome();
              } else {
                nullOrders.forEach(order => {
                  checkForProducts(order)
                    .then(products => {
                      if (products.length === 0) {
                        console.log(" Please add some products to your order first. Returning to main menu.");
                        displayWelcome();
                      } else {
                        sumOrderTotal(nullOrders[0].order_id)
                          .then(total => {
                            getCustomerPaymentTypes(active)
                              .then(payTypes => {
                                if (payTypes.length === 0) {
                                  console.log(' Customer must have valid payment type saved to complete an order');
                                  displayWelcome();
                                } else {
                                  let pattern = generatePaymentOptions(payTypes);
                                  promptCompleteOrder(total.total, pattern, payTypes, active)
                                    .then(result => {
                                      displayWelcome();
                                    });
                                }
                              });
                          });
                      };
                    });
                });
              }
            };
          });
      };
    }

    // View stale products
    case 7: {
      if (isActiveCustomerSet()) {
        getStaleProducts(getActiveCustomer().id).then(products => {
          if (products.length > 0) {

            // Required indent to conform with Joe's CLI code.
            for (let product of products) {
              product = addSpace(product, ['product_id']);
            }

            console.table(products);
          } else {
            console.log(' No stale products');
          }
          pressEnterToContinue().then(() => {
            displayWelcome();
          });
        });
      } else {
        console.log(' Please choose active customer before checking their stale  products');
        displayWelcome();
      }
      break;
    }
  }
}

const displayWelcome = () => {
  const headerDivider = `${magenta('*********************************************************')}`
  return new Promise((resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}
  ${magenta('-- Active Customer:')} ${isActiveCustomerSet() ? getActiveCustomer().fullName : `None`}
  ${headerDivider}
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to inventory
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} View stale products
  ${magenta('.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler);
  });
};

module.exports = {
  displayWelcome
};