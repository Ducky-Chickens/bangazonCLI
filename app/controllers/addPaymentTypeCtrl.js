'use strict'; 
const prompt = require('prompt');

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
