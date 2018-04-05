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
<<<<<<< HEAD
const { promptNewCustomer } = require('./controllers/customerCtrl');
const promptActivateCustomer = require('./controllers/activateCustomerCtrl');
const { promptPaymentType } = require('./controllers/addPaymentTypeCtrl');
const { promptChooseProduct, promptChooseAttribute, promptNewValue } = require('./controllers/updateProductCtrl');
=======
const promptAddCustomer = require('./controllers/addCustomerCtrl')
const promptActivateCustomer = require('./controllers/activateCustomerCtrl')
>>>>>>> master
const promptAddCustomerProduct = require('./controllers/addCustomerProductCtrl');

/*
MODELS
*/
const getCustomers = require('./models/getCustomers');
<<<<<<< HEAD
const addPaymentType = require('./models/AddPaymentType');
const { getProducts, updateProduct } = require('./models/UpdateProduct');
=======
const addCustomer = require('./models/AddCustomer');
>>>>>>> master
const addCustomerProduct = require('./models/AddCustomerProduct');

/*
ACtiVE CUSTOMER
*/
const { setActiveCustomer, getActiveCustomer, isActiveCustomerSet } = require('../app/activeCustomer');

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

    // Add Payment Type
    case 3: {
      //check if active customer
      if(getActiveCustomer().id){
        promptPaymentType().then((paymentData) => {
          addPaymentType(getActiveCustomer(),paymentData);
          console.log(`\n${blue(`${paymentData.payment} payment added`)}`)
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
  ${magenta('9.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler);
  });
};

module.exports = {
  displayWelcome
};