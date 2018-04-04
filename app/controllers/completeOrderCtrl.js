'use strict'

const { displayWelcome } = require('../ui');
const prompt = require('prompt');
const { getActiveCustomer } = require('../activeCustomer');
const { checkForOrder } = require('../models/completeOrder');

module.exports.generatePaymentOptions = options => {
  const possibleOptions = []
  for (let i = 0; i < options; i++) {
    possibleOptions.push(i);
  }
  return new RegExp(`^(${possibleOptions.join('|')})$`);
}

module.exports.promptCompleteOrder = (total, payments) => {


  const selectPayment = {
    properties: {
      paymentID: {
        pattern: generatePaymentOptions(payments),
        description: "Please select a payment type",
        message: 'Must select a number from the provided list',
        required: true
      },
    }
  }

  const selectReady = {
    properties: {
      state: {
        pattern: /^[YN]$/,
        description: "(Y/N)",
        message: `Your order total is ${total}. Please select Y or N to confirm or cancel payment`,
        required: true
      },
    }
  }

  return new Promise ((resolve, reject) => {
    prompt.get(selectReady, function (err, result) {
      switch (result.state) {
        case "Y": 
          prompt.get(selectPayment, function(err, result) {
          // complete order not yet written
          completeOrder(result)
          .then(newProgram => {
            console.log('Order payment successful');
            console.log(newProgram);
            displayWelcome();
          }).catch(() => {
            console.log('Program failed to add. Please try again.')
            displayWelcome();
          })
        });
        case "N":
          console.log("Order payment cancelled.")
          displayWelcome();
      }
    })
  })
}