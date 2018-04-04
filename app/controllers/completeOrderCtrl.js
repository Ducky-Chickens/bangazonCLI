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

module.exports.promptCompleteOrder = () => {

  // let activeCustomer = getActiveCustomer();

  // if (activeCustomer === null) {
  //   console.log('Please select active customer before completing an order')
  //   displayWelcome();
  // }

  let orders = checkForOrder(activeCustomer.id);

  // if(orders === )

  let customerPayments = getCustomerPaymentsCount(activeCustomer.id);


  const selectPayment = {
    properties: {
      paymentID: {
        pattern: generatePaymentOptions(customerPayments),
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
        message: 'Please select Y or N to confirm or cancel payment',
        required: true
      },
    }
  }

  return new Promise ((resolve, reject) => {
    prompt.get(selectReady, function (err, result) {
      switch (result.state) {
        case "Y": 
          prompt.get(selectPayment, function(err, result) {
          completeOrder(result)
          .then(newProgram => {
            console.log('Order payment successful');
          }).catch(() => {
            console.log('Program failed to add. Please try again.')
          })
        });
        case "N":
          console.log("Order payment cancelled.")
          displayWelcome();
      }
    })
  })
}