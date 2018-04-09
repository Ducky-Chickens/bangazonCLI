"use strict";

// 3rd party libs
const { red, magenta, blue, green } = require("chalk");

const assert = require("assert");

const prompt = require("prompt");
const colors = require("colors/safe");
const path = require("path");
const { Database } = require("sqlite3").verbose();
const db = new Database(path.join(__dirname, "..", "bangazon.sqlite"));
require("console.table");

prompt.message = colors.blue('Bangazon Corp')

/*
  CONTROLLERS
*/

const promptAddCustomer = require("./controllers/addCustomerCtrl");
const {
  generatePaymentOptions,
  promptCompleteOrder,
  paymentTypeSchema
} = require("./controllers/completeOrderCtrl");
const {removeProductSchema} = require('./controllers/removeProductCtrl')

const { promptPaymentType } = require("./controllers/addPaymentTypeCtrl");
const {
  promptChooseProduct,
  promptChooseAttribute,
  promptNewValue
} = require("./controllers/updateProductCtrl");
const promptAddCustomerProduct = require("./controllers/addCustomerProductCtrl");
const {
  promptAvailableProducts
} = require("./controllers/addOrderProductCtrl");
const pressEnterToContinue = require("./controllers/pressEnterToContinue");
const promptStaleProduct = require("./controllers/staleProductsCtrl");
const promptActivateCustomer = require("./controllers/activeCustomerCtrl");
const createRevenueTable = require('./controllers/getCustomerRevenueCtrl');


/*
  MODELS
*/

const {
  checkForOrder,
  getCustomerPaymentTypes,
  sumOrderTotal,
  checkForProducts,
  checkProductQuantity,
  updateProductQuantity
} = require("./models/completeOrder");
const {removeProduct, getProds, getOrders} = require('./models/removeProduct')

const getCustomers = require("./models/GetCustomers");
const addPaymentType = require("./models/AddPaymentType");
const { getProductsById, updateProduct } = require("./models/UpdateProduct");
const addCustomer = require("./models/AddCustomer");
const addCustomerProduct = require("./models/AddCustomerProduct");
const { addCustomerPaymentType } = require("./models/AddPaymentType");
const getProductPopularity = require("../app/models/GetProductPopularity");
const getStaleProducts = require("./models/GetStaleProducts");

const {
  getActiveOrder,
  getProducts,
  addOrderProduct,
  addOrder
} = require("./models/AddOrderProduct");
const getCustomerRevenue = require('./models/GetCustomerRevenue');


/*
  ACTIVE CUSTOMER
*/
const {
  setActiveCustomer,
  getActiveCustomer,
  isActiveCustomerSet
} = require("./activeCustomer");

/*
  HELPERS
*/
const addSpace = require("./helpers/addSpace");
const generateProductPopularityTable = require("./helpers/generateProductPopularityTable")

/*
  START OF CLI
*/
prompt.start()

const mainMenuHandler = (err, { choice }) => {
  switch (Number(choice)) {
    // Create Customer
    case 1: {
      promptAddCustomer().then(custData => {
        addCustomer(custData).then(custID => {
          console.log(
            `\n${blue(custData.name + " added to line " + custID.id)}`
          );
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
      break
    }

    // Add Payment Type
    case 3: {
      // check if active customer
      if (getActiveCustomer().id) {
        promptPaymentType().then(paymentData => {
          addPaymentType(getActiveCustomer(), paymentData);
          console.log(`\n${blue(`${paymentData.payment} payment added`)}`);
          displayWelcome();
        });
      } else {
        console.log(
          `\n${red(`Please choose active customer before adding a payment`)}`
        );
        displayWelcome();
      }
      break
    }

    case 4: {
      if (getActiveCustomer().id) {
        promptAddCustomerProduct().then(productData => {
          addCustomerProduct(getActiveCustomer(), productData).then(lineNum => {
            console.log(
              `\n${blue(productData.title + " added to line " + lineNum.id)}`
            );
            displayWelcome();
          });
        });
        break;
      } else {
        console.log(
          `\n${red(
            "PLEASE SELECT A CUSTOMER (#2) THEN RETURN TO THIS COMMAND"
          )}`
        );
        displayWelcome();
      }
    }

    // Complete Order
    case 5: {
      let active = getActiveCustomer().id
      if (active === null) {
        console.log(" Please activate a customer with the main menu");
        displayWelcome();
      } else {
        checkForOrder(active).then(orders => {
          if (orders.length === 0) {
            console.log(
              " Please add some products to your order first. Returning to main menu."
            );
            displayWelcome();
          } else {
            let nullOrders = [];
            for (let i = 0; i < orders.length; i++) {
              if (orders[i].payment_type === null) {
                nullOrders.push(orders[i]);
              }
            }
            if (nullOrders.length === 0) {
              console.log(
                " Please add some products to your order first. Returning to main menu."
              );
              displayWelcome();
            } else {
              nullOrders.forEach(order => {
                checkForProducts(order).then(products => {
                  if (products.length === 0) {
                    console.log(
                      " Please add some products to your order first. Returning to main menu."
                    );
                    displayWelcome();
                  } else {
                    sumOrderTotal(nullOrders[0].order_id).then(total => {
                      getCustomerPaymentTypes(active).then(payTypes => {
                        if (payTypes.length === 0) {
                          console.log(
                            " Customer must have valid payment type saved to complete an order"
                          );
                          displayWelcome();
                        } else {
                          let pattern = generatePaymentOptions(payTypes);
                          promptCompleteOrder(
                            total.total,
                            pattern,
                            payTypes,
                            active,
                            products,
                            nullOrders
                          ).then(result => {
                            displayWelcome();
                          });
                        }
                      });
                    });
                  }
                });
              });
            }
          }
        });
      }
      break;
    }

    // Get Overall Product Popularity
    case 6: {
      if (isActiveCustomerSet()) {
        getProductPopularity(getActiveCustomer().id).then(products => {
          generateProductPopularityTable(products);
          pressEnterToContinue().then(() => {
            displayWelcome();
          });
        });
      } else {
        console.log(
          `Please choose active customer before getting their products' popularity`
        );
        displayWelcome();
      }
      break;
    }
    // View stale products
    case 7: {
      if (isActiveCustomerSet()) {
        getStaleProducts(getActiveCustomer().id).then(products => {
          if (products.length > 0) {

            // Required indent to conform with Joe's CLI code.
            for (let product of products) {
              product = addSpace(product, ['product_id'])
            }

            console.table(products)
          } else {
            console.log(' No stale products')
          }
          pressEnterToContinue().then(() => {
            displayWelcome()
          })
        })
      } else {
        console.log(' Please choose active customer before checking their stale  products')
        displayWelcome()
      }
      break
      promptStaleProduct().then(() => {
        displayWelcome();
      });
      break;
    }

    // Update Product
    case 8: {
      if (getActiveCustomer().id) {
        getProductsById(getActiveCustomer()).then(products => {
          if (products.length < 1) {
            console.log(
              `\n${red(`No current products listed for this customer`)}`
            );
            displayWelcome();
          } else {
            promptChooseProduct(products).then(product => {
              promptChooseAttribute(product).then(input => {
                promptNewValue(input).then(obj => {
                  updateProduct(getActiveCustomer(), obj);
                  console.log(`\n${blue(`${obj.column} updated`)}`);
                  displayWelcome();
                });
              });
            });
          }
        });
      } else {
        console.log(
          `\n${red(`Please choose active customer before updating a product`)}`
        );
        displayWelcome();
      }
      break
    }

    // Remove product from active customer
    case 9: {
      if (getActiveCustomer().id) {
        let newArr = [];
        getProds(getActiveCustomer().id).then(products => {
          console.log('\n')
          products.forEach((product) => {
            if (product.customer_id == getActiveCustomer().id) {
              getOrders(product.product_id).then(orders => {
                if (orders.length === 0) {
                  console.log(`${product.product_id}. ${product.product_name}`)
                  newArr.push(product.product_id)
                }
              })
            }
          })
        })
        removeProductSchema().then(deleteProd => {
          if (newArr.indexOf(Number(deleteProd.id)) >= 0) {
            removeProduct(deleteProd.id)
            console.log('You have successfully removed a product from your list')
            displayWelcome()
          } else {
            console.log('Please choose a product from the list')
            displayWelcome()

          }
        })
      } else {
        console.log(`\n${red('PLEASE SELECT A CUSTOMER (#2) THEN RETURN TO THIS COMMAND')}`)
        displayWelcome()
      }
      break;
    }

    // Add product to order
    case 10: {
      if (isActiveCustomerSet()) {
        const userId = getActiveCustomer().id;
        getProducts(userId).then(products => {
          promptAvailableProducts(products).then(product => {
            if (product) {
              getActiveOrder(userId).then(order => {
                if (order) {
                  addOrderProduct(userId, {
                    orderId: order.order_id,
                    prodId: product.product_id,
                    price: product.price
                  });
                  console.log(`\n${blue(`Product added to order`)}`);
                  displayWelcome();
                } else {
                  addOrder(userId).then(newOrder => {
                    addOrderProduct(userId, {
                      orderId: newOrder.id,
                      prodId: product.product_id,
                      price: product.price
                    });
                    console.log(`\n${blue(`Product added to order`)}`);
                    displayWelcome();
                  });
                }
              });
            } else {
              displayWelcome();
            }
          });
        });
      } else {
        console.log(" Please choose active customer before adding to an order");
        displayWelcome();
      }
      break;
    }

    // View Active Customer Revenue
    case 11: {
      if (getActiveCustomer().id) {
        getCustomerRevenue(getActiveCustomer().id)
        .then(revenue=> {
          if(!revenue.length){
            console.log(`\n${green('No current revenue for customer #' + getActiveCustomer().id)}`);
            pressEnterToContinue().then(() => displayWelcome());
          } else {
            createRevenueTable(revenue)
            pressEnterToContinue().then(() => displayWelcome());
          }
        });
      } else {
        console.log(`\n${red('PLEASE SELECT A CUSTOMER (#2) THEN RETURN TO THIS COMMAND')}`);
        displayWelcome();
      }
      break;
    }

  }
};

const displayWelcome = () => {
  const headerDivider = `${magenta(
    "*********************************************************"
  )}`;
  return new Promise((resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta("**  Welcome to Bangazon! Command Line Ordering System  **")}
  ${headerDivider}
  ${magenta("-- Active Customer:")} ${
      isActiveCustomerSet() ? getActiveCustomer().fullName : `None`
    }
  ${headerDivider}
  ${magenta("1.")} Create a customer account
  ${magenta("2.")} Choose active customer
  ${magenta("3.")} Create a payment option
  ${magenta("4.")} Add product to inventory
  ${magenta("5.")} Complete an order
  ${magenta("6.")} See product popularity
  ${magenta("7.")} View stale products
  ${magenta("8.")} Update a product
  ${magenta("9.")} Remove a product
  ${magenta("10.")} Add to cart
  ${magenta('11.')} Check product revenue per customer
  ${magenta("12.")} Leave Bangazon!`);
    prompt.get(
      [
        {
          name: "choice",
          description: "Please make a selection"
        }
      ],
      mainMenuHandler
    );
  });
};

module.exports = {
  displayWelcome
};
