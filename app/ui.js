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
const addProductOrder = require('./controllers/addProductOrderCtrl');
const {removeProductSchema} = require('./controllers/removeProductCtrl');

/*
MODELS
*/
const getCustomers = require('./models/getCustomers');
const addProducts = require('./models/addProductOrder');
const {removeProduct} = require('./models/removeProduct');
const {getProducts} = require('./models/removeProduct');

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
    //Remove product from active customer
    case 7: {
      getProducts(getActiveCustomer().id).then(products => {
        products.forEach((product,i) => {
          console.log(`${i+1}. ${product.product_name}`)
        });
      removeProductSchema().then(product => {
        if(product.id != getActiveCustomer().id){
          console.log('please choose a product from the list')
        } else {
          removeProduct(product.id)
          console.log('You have successfully removed a product from your list');

        }
        displayWelcome();
      });
    });
    }
    break;
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
  ${magenta('4.')} Add product to shopping cart
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} Remove a product
  ${magenta('8.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler);
  });
};

module.exports = {
  displayWelcome
};