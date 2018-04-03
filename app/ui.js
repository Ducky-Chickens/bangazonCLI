'use strict';

// 3rd party libs
const { red, magenta, blue } = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue("Bangazon Corp");

// controllers
const { promptNewCustomer } = require('./controllers/customerCtrl')
const promptActivateCustomer = require('./controllers/activateCustomerCtrl')

// models
const getCustomers = require('./models/getCustomers');

// activeCustomer
const { setActiveCustomer, getActiveCustomer } = require('../app/activeCustomer');

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

let mainMenuHandler = (err, userInput) => {
  // This could get messy quickly. Maybe a better way to parse the input?
  if (userInput.choice == '1') {
    promptNewCustomer()
      .then((custData) => {
        console.log('customer data to save', custData);
        //save customer to db
      });
  }

  // Activate Customer
  else if (userInput.choice == '2') {
    getCustomers().then(customers => {

      // TODO: Only allow numbers that exist in sql database
      for(let customer of customers){
        console.log(customer.id, customer.name);
      }

      promptActivateCustomer()
        .then(customerId => {
          setActiveCustomer(customerId);
        });
    });
  }
};

module.exports.displayWelcome = () => {
  let headerDivider = `${magenta('*********************************************************')}`
  return new Promise((resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to shopping cart
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler);
  });
};
