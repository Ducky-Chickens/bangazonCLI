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
const { generatePaymentOptions, promptCompleteOrder } = require('./controllers/completeOrderCtrl');

/*
MODELS
*/
const getCustomers = require('./models/getCustomers');
const { checkForOrder, getCustomerPaymentTypes, sumOrderTotal } = require('./models/completeOrder');

/*
ACtiVE CUSTOMER
*/
const { setActiveCustomer, getActiveCustomer, isActiveCustomerSet } = require('../app/activeCustomer');

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

        // List of customer ids
        for (let customer of customers) {
          console.log(customer.id, customer.name);
        }
        promptActivateCustomer(customers.length)
          .then(({ customerId }) => {
            const customer = customers.find(({id}) => +id === +customerId);
            
            setActiveCustomer(+customer.id, customer.name);
            displayWelcome();
          });
      });
      break;
    }

    // Complete Order
    case 5: {
      let active = getActiveCustomer().id;
      if(active === null) {
        console.log('Please activate a customer with the main menu');
        displayWelcome()
      } else {
        console.log('active', active);
        checkForOrder(active)
        .then(orders => {
          if (orders.length === 0) {
            console.log("Please add some products to your order first. Press any key to return to main menu.");
            displayWelcome();
          } else {
            console.log('orders', orders);
            let total = sumOrderTotal(active);
            getCustomerPaymentTypes(active)
            .then(payTypes => {
              console.log(payTypes);
              for( let i in payTypes) {
                console.log(`${i}`, payTypes[i].method, payTypes[i].account_number);
              }
              let pattern = generatePaymentOptions(payTypes);
              promptCompleteOrder(total, pattern)
              .then(result => {
                console.log('result', result);
                displayWelcome();
              })
            })
          }
        })
        
      }

      // THEN prompt "Order successful: (List final order details)"
      // THEN displayWelcome()
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

module.exports = {
  displayWelcome
};