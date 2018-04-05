'use strict'

const prompt = require('prompt');
const { getActiveCustomer } = require('../activeCustomer');
const { checkForOrder, finalizePaymentType, getPayTypeByAccountNumber } = require('../models/completeOrder');

module.exports.generatePaymentOptions = options => {
  const possibleOptions = []
  for (let i = 0; i < options.length; i++) {
    possibleOptions.push(options[i].account_number);
  }
  return new RegExp(`^(${possibleOptions.join('|')})$`);
};

module.exports.promptCompleteOrder = (total, paymentReg, payTypes, custId) => {
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
  return new Promise ((resolve, reject) => {
    prompt.get(selectReady, function (err, result) {
      switch (result.response) {
        case "Y": {
          for( let i in payTypes) {
            console.log(payTypes[i].method, payTypes[i].account_number);
          }
          prompt.get(selectPayType, function(err, result) {
          getPayTypeByAccountNumber(result.number, custId)
          .then(id => {
            finalizePaymentType(id.payment_id, custId)
            .then(newProgram => {
              console.log(' Order payment successful');
              resolve(newProgram);
            }).catch(() => {
              console.log(' Program failed to add. Please try again')
              resolve(null);
            })
          });
          })
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