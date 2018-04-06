'use strict'

const prompt = require('prompt');
const { getActiveCustomer } = require('../activeCustomer');
const { checkForOrder, finalizePaymentType, getPayTypeByAccountNumber, checkProductQuantity, updateProductQuantity } = require('../models/CompleteOrder');

module.exports.generatePaymentOptions = options => {
  const possibleOptions = []
  for (let i = 0; i < options.length; i++) {
    possibleOptions.push(options[i].account_number);
  }
  return new RegExp(`^(${possibleOptions.join('|')})$`);
};

module.exports.promptCompleteOrder = (total, paymentReg, payTypes, custId, products, nullOrders) => {
  const selectPayType = {
    properties: {
      number: {
        name: 'Payment Type',
        description: ' Enter desired payment type account number',
        pattern: paymentReg,
        message: ' Please select the number of one of the listed accounts',
        required: true
      }
    }
  };

  const selectReady = {
    properties: {
      response: {
        pattern: /^[YN]$/,
        description: ` Your order total is $${total}. Please select Y or N to confirm or cancel payment (Y/N)`,
        message: "  Please respond with 'Y' or 'N'",
        required: true
      }
    }
  };
  return new Promise((resolve, reject) => {
    prompt.get(selectReady, function (err, result) {
      switch (result.response) {
        case "Y": {
          for (let i in payTypes) {
            console.log(payTypes[i].method, payTypes[i].account_number);
          }
          prompt.get(selectPayType, function (err, result) {
            getPayTypeByAccountNumber(result.number, custId)
              .then(id => {
                let productsWithQuantity = [];
                finalizePaymentType(id.payment_id, custId)
                  .then(newProgram => {
                    console.log(' Order payment successful');
                    let removeDuplicates = [...new Set(products.map(prod => prod.product_id))];
                    const removeDuplicatesPromises = [];
                    removeDuplicates.forEach(item => {
                      removeDuplicatesPromises.push(checkProductQuantity(nullOrders[0].order_id, item));
                    });
                    Promise.all(removeDuplicatesPromises).then(result => {
                      result.forEach(result => {
                        let final = result.inventory - result.cart_quantity;
                        updateProductQuantity(final, result.product_id)
                          .then(results => {
                            resolve(results);
                          });
                      });
                    })
                    resolve(newProgram);
                  });
              }).catch((error) => {
                console.log(' Order payment failed. Please try again.')
                console.log(' Error: ', error);
                resolve(null);
              })
          });
          break;
        }
        case "N": {
          console.log(" Order payment cancelled");
          resolve(null);
        }
      }
    });
  });
};