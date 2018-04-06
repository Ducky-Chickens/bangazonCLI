'use strict'; 
const prompt = require('prompt');

/**
 * @function
 * @name promptPaymentType
 * @description Used to intake new payment method for active customer.
 * @returns promise with a prompt.get in it.
 * @param - amount of customers
 */
module.exports.promptPaymentType = () => {
  return new Promise((resolve, reject) => {
    prompt.get([
      {
        name: "payment",
        description: `Please enter one of the following payment methods (AmEx, MasterCard, Visa, PayPal)`,
        type: 'string',
        pattern: /^AmEx|MasterCard|Visa|PayPal$/,
        message: 'Please enter one of the available options exactly as it appears',
        required: true
      },
      {
        name: "accountNumber",
        description: `Enter account number`,
        type: 'number',
        pattern: /^\d+$/,
        message: 'Must be an integer',
        required: true
      }
    ], 
    (err, results) => {
      if(err) return reject(err);
      resolve(results);
    })
  });
}
