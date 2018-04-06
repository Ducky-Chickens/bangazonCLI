'use strict'

// 3rd party libs
const {red, magenta, blue} = require('chalk')

const prompt = require('prompt')
const colors = require('colors/safe')
const path = require('path')
const {Database} = require('sqlite3').verbose()
const db = new Database(path.join(__dirname, '..', 'bangazon.sqlite'))

prompt.message = colors.blue('Bangazon Corp')

/*
CONTROLLERS
*/
const {promptNewCustomer} = require('./controllers/customerCtrl')
const promptActivateCustomer = require('./controllers/activateCustomerCtrl')
const addProductOrder = require('./controllers/addProductOrderCtrl')
const {removeProductSchema} = require('./controllers/removeProductCtrl')

/*
MODELS
*/
const getCustomers = require('./models/getCustomers')
const addProducts = require('./models/addProductOrder')
const {removeProduct, getProducts, getOrders} = require('./models/removeProduct')

/*
ACtiVE CUSTOMER
*/
const {setActiveCustomer, getActiveCustomer} = require('../app/activeCustomer')

prompt.start()

const mainMenuHandler = (err, {choice}) => {

  switch (Number(choice)) {

    // Create Customer
    case 1: {
      promptNewCustomer()
        .then((custData) => {
          console.log('customer data to save', custData)
        // save customer to db
        })
      break
    }

    // Activate Customer
    case 2: {
      getCustomers().then(customers => {

        for (let customer of customers) {
          console.log(customer.id, customer.name)
        }

        promptActivateCustomer(customers.length)
          .then(({customerId}) => {

            // TODO: Only allow ids that exist in sql database
            setActiveCustomer(+customerId)
            displayWelcome()
          })
      })
      break
    }
    // Remove product from active customer
    case 7: {
      let newArr
      let hasAdded
      let newFunction = () => {
        return new Promise ((resolve,reject) => {
        getProducts(getActiveCustomer().id).then(products => {
          newArr = products
          console.log('\n')
          products.forEach((product) => {
            console.log(`${product.product_id}. ${product.product_name}`)
          })
        })
        removeProductSchema().then(deleteProd => {
          let checkOrders
          getOrders(deleteProd.id).then(orders => {
            checkOrders = orders
            resolve(hasAdded = false)
            for (let i = 0; i < newArr.length; i++) {
              if (newArr[i].customer_id == getActiveCustomer().id && deleteProd.id == newArr[i].product_id && checkOrders.length === 0) {
                removeProduct(deleteProd.id)
                hasAdded = true
                console.log('You have successfully removed a product from your list')
                displayWelcome();
                break
              }
            }
          })
        })
      });
      }
      newFunction().then(data => {
      if(data == false){
        console.log('Please choose a product from the list:')
        newFunction();
      }
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
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to shopping cart
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} Remove a product
  ${magenta('8.')} Leave Bangazon!`)
      prompt.get([{
        name: 'choice',
        description: 'Please make a selection'
      }], mainMenuHandler)
    })
  }

  module.exports = {displayWelcome};
