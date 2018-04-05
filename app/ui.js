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
const { promptNewCustomer } = require('./controllers/customerCtrl');
const promptActivateCustomer = require('./controllers/activateCustomerCtrl');
const { promptPaymentType } = require('./controllers/addPaymentTypeCtrl');
const { promptChooseProduct, promptChooseAttribute, promptNewValue } = require('./controllers/updateProductCtrl');
const promptAddCustomer = require('./controllers/addCustomerCtrl');
const promptAddCustomerProduct = require('./controllers/addCustomerProductCtrl');
const pressEnterToContinue = require('./controllers/pressEnterToContinue')

/*
  MODELS
*/
const getCustomers = require('./models/getCustomers');
const addPaymentType = require('./models/AddPaymentType');
const { getProducts, updateProduct } = require('./models/UpdateProduct');
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
      if (getActiveCustomer().id) {
        promptAddCustomerProduct()
          .then((productData) => {
            addCustomerProduct(getActiveCustomer(), productData)
              .then(lineNum => {
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
};

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
  ${magenta('7.')} Remove a product
  ${magenta('8.')} Update a product
  ${magenta('9.')} View stale products
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