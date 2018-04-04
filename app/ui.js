'use strict';

// 3rd party libs
const { red, magenta, blue } = require("chalk");

const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');
const { Database } = require('sqlite3').verbose();
const db = new Database(path.join(__dirname, '..', 'bangazon.sqlite'));

prompt.message = colors.blue("Bangazon Corp");

/*
CONTROLLERS
*/
const { promptNewCustomer } = require('./controllers/customerCtrl')
const promptActivateCustomer = require('./controllers/activateCustomerCtrl')
const promptAddCustomerProduct = require('./controllers/addCustomerProductCtrl');

/*
MODELS
*/
const getCustomers = require('./models/getCustomers');
const addCustomerProduct = require('./models/AddCustomerProduct');

/*
ACtiVE CUSTOMER
*/
const { setActiveCustomer, getActiveCustomer } = require('../app/activeCustomer');

prompt.start();

const mainMenuHandler = (err, { choice }) => {

  switch (Number(choice)) {

    // Create Customer
    case 1: {
      promptNewCustomer()
        .then((custData) => {
          console.log('customer data to save', custData);
          //save customer to db
        });
      break;
    }

    // Activate Customer
    case 2: {
      getCustomers().then(customers => {

        for (let customer of customers) {
          console.log(customer.id, customer.name);
        }

        promptActivateCustomer(customers.length)
          .then(({customerId}) => {

            // TODO: Only allow ids that exist in sql database
            setActiveCustomer(+customerId);
            displayWelcome();
          });
      });
      break;
    }

  case 4: {
      if(getActiveCustomer().id){
        promptAddCustomerProduct()
        .then((productData) => {
          console.log('product data to save', productData);
          console.log(getActiveCustomer());
          // addCustomerProduct(getActiveCustomer(), productData)
          // .then(lineNum=>{
          //   console.log(`Product added to line ${lineNum.id}`)
          //   displayWelcome();
          // });
        });
        break;
      } else {
        console.log(`\n${red('PLEASE SELECT A CUSTOMER (#2) THEN RETURN TO THIS COMMAND')}`);
        displayWelcome();
      }
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
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to inventory
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler);
  });
};

module.exports = {
  displayWelcome
};