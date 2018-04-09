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
const promptAddCustomer = require('./controllers/addCustomerCtrl');
const { generatePaymentOptions, promptCompleteOrder, paymentTypeSchema } = require('./controllers/completeOrderCtrl');
const { promptPaymentType } = require('./controllers/addPaymentTypeCtrl');
const { promptChooseProduct, promptChooseAttribute, promptNewValue } = require('./controllers/updateProductCtrl');
const promptAddCustomerProduct = require('./controllers/addCustomerProductCtrl');
const pressEnterToContinue = require('./controllers/pressEnterToContinue');
const promptStaleProduct = require('./controllers/staleProductsCtrl');
const promptActivateCustomer = require('./controllers/activeCustomerCtrl');

/*
  MODELS
*/
const { checkForOrder, getCustomerPaymentTypes, sumOrderTotal, checkForProducts } = require('./models/completeOrder');
const addPaymentType = require('./models/AddPaymentType');
const { getProducts, updateProduct } = require('./models/UpdateProduct');
const addCustomer = require('./models/AddCustomer');
const addCustomerProduct = require('./models/AddCustomerProduct');
const { addCustomerPaymentType } = require('./models/AddPaymentType');

/*
  ACTIVE CUSTOMER
*/
const { setActiveCustomer, getActiveCustomer, isActiveCustomerSet } = require('./activeCustomer');

/*
  HELPERS
*/
const addSpace = require('./helpers/addSpace');

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
      promptActivateCustomer().then(() => {
        displayWelcome();
      });
      break;
    }

    // Add Payment Type
    case 3: {
      //check if active customer
      if (getActiveCustomer().id) {
        promptPaymentType().then((paymentData) => {
          addPaymentType(getActiveCustomer(),paymentData);
          console.log(`\n${blue(`${paymentData.payment} payment added`)}`)
          addCustomerPaymentType(getActiveCustomer(), paymentData);
          displayWelcome();
        })
      } else {
        console.log(`\n${red(`Please choose active customer before adding a payment`)}`);
        displayWelcome();
      }
      break;
    }

    // Update Product
    case 8: {
      if (getActiveCustomer().id) {
        getProducts(getActiveCustomer())
        .then(products => {
          if(products.length < 1){
            console.log(`\n${red(`No current products listed for this customer`)}`);
            displayWelcome();
          } else {
            promptChooseProduct(products).then(result => {
              promptChooseAttribute(result).then(input => {
                promptNewValue(input).then(obj => {
                  updateProduct(getActiveCustomer(), obj);
                  console.log(`\n${blue(`${obj.column} updated`)}`);
                  displayWelcome();
                })
              })
            })
          }
        })
      } else {
        console.log(`\n${red(`Please choose active customer before updating a product`)}`);
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
      break;
    }

    // View stale products
    case 7: {
      promptStaleProduct().then(() => {
        displayWelcome();
      });
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
  ${magenta('8.')} Update a product
  ${magenta('9.')} Remove a product
  ${magenta('10.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler);
  });
};

module.exports = {
  displayWelcome
};