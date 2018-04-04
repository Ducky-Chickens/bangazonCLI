'use strict'

const { displayWelcome } = require('../ui');
// console.log(displayWelcome());
const prompt = require('prompt');
const { getActiveCustomer } = require('../activeCustomer');
const { checkForOrder } = require('../models/completeOrder');

module.exports.generatePaymentOptions = options => {
  const possibleOptions = []
  for (let i = 0; i < options.length; i++) {
    possibleOptions.push(options[i].method);
  }
  return new RegExp(`^(${possibleOptions.join('|')})$`);
};

module.exports.paymentTypeCount = () => {
  return new Promise((resolve, reject) => {
      prompt.get([{
          name: 'Payment Type',
          description: 'Enter desired payment type.',
          pattern: generatePossibleIdRegex(paymentTypeCount),
          required: true
      }], function (err, results) {
          return err ? reject(err) : resolve(results);
      });
  });
};

module.exports.promptCompleteOrder = (total, paymentPattern) => {
  const selectReady = {
    properties: {
      state: {
        pattern: /^[YN]$/,
        description: "(Y/N)",
        message: `Your order total is ${total}. Please select Y or N to confirm or cancel payment`,
        required: true
      }
    }
  };
  return new Promise ((resolve, reject) => {
    prompt.get(selectReady, function (err, result) {
      switch (result.state) {
        case "Y": {
          prompt.get(selectPayment, function(err, result) {
          // complete order not yet written
          completeOrder(result)
          .then(newProgram => {
            console.log('Order payment successful');
            console.log(newProgram);
            // displayWelcome();
          }).catch(() => {
            console.log('Program failed to add. Please try again.')
            // displayWelcome();
          })
        });
        break;
        } 
        case "N": {
          console.log("Order payment cancelled.");
          // const { displayWelcome } = require('../ui');
          // holy shit
          console.log('displayWelcome', typeof(displayWelcome)); 
          displayWelcome();
        }
      }
    });
  });
};