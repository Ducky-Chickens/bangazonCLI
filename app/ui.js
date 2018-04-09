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
const { promptAvailableProducts } = require('./controllers/addOrderProductCtrl');
const pressEnterToContinue = require('./controllers/pressEnterToContinue');
const promptStaleProduct = require('./controllers/staleProductsCtrl');
const promptActivateCustomer = require('./controllers/activeCustomerCtrl');

/*
  MODELS
*/
const { checkForOrder, getCustomerPaymentTypes, sumOrderTotal, checkForProducts, checkProductQuantity, updateProductQuantity } = require('./models/completeOrder');
const getCustomers = require('./models/GetCustomers');
const addPaymentType = require('./models/AddPaymentType');
const { getProductsById, updateProduct } = require('./models/UpdateProduct');
const addCustomer = require('./models/AddCustomer');
const addCustomerProduct = require('./models/AddCustomerProduct');
const getStaleProducts = require('./models/GetStaleProducts');
const { getActiveOrder, getProducts, addOrderProduct, addOrder } = require('./models/AddOrderProduct');


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
            .then(custID => {
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
          addPaymentType(getActiveCustomer(), paymentData);
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
<<<<<<< HEAD
        getProducts(getActiveCustomer())
          .then(products => {
            if (products.length < 1) {
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
=======
        getProductsById(getActiveCustomer()).then(products => {
          if(products.length < 1){
            console.log(`\n${red(`No current products listed for this customer`)}`);
            displayWelcome();
          } else {
            promptChooseProduct(products).then(product => {
              promptChooseAttribute(product).then(input => {
                promptNewValue(input).then(obj => {
                  updateProduct(getActiveCustomer(), obj);
                  console.log(`\n${blue(`${obj.column} updated`)}`);
                  displayWelcome();
>>>>>>> 139693d8dd8c1b59f9fd84a8fb9e17c7d9741dab
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
                                  promptCompleteOrder(total.total, pattern, payTypes, active, products, nullOrders)
                                    .then(result => {
                                      displayWelcome();
                                    });
                                }
                              });
                          });
                      };
                    });
                })
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

    // Add product to order
    case 10: {
      if(isActiveCustomerSet()) {
        const userId = getActiveCustomer().id;
        getProducts(userId).then(products => {
          promptAvailableProducts(products).then(product => {
            if(product) {
              getActiveOrder(userId).then(order => {
                if(order){
                  addOrderProduct(userId, {"orderId":order.order_id, "prodId":product.product_id, "price": product.price});
                  console.log(`\n${blue(`Product added to order`)}`);
                  displayWelcome();
                } else {
                  addOrder(userId).then(newOrder => {
                    addOrderProduct(userId, { "orderId": newOrder.id, "prodId": product.product_id, "price": product.price });
                    console.log(`\n${blue(`Product added to order`)}`);
                    displayWelcome();
                  })
                }
              })
            } else {
              displayWelcome();
            }
          })
        })
      } else {
        console.log(' Please choose active customer before adding to an order');
        displayWelcome();
      }
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
  ${magenta('10.')} Add to cart
  ${magenta('11.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler);
  });
};

module.exports = {
  displayWelcome
};