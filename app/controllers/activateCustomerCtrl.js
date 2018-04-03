'use strict';
const prompt = require('prompt');

/**
 * @function
 * @name promptActivateCustomer
 * @description Used to intake customer id for activate customer.
 * @returns promise with a prompt.get in it.
 */
module.exports = () => {
  return new Promise( (resolve, reject) => {
    prompt.get([{
      name: 'customerId',
      description: 'Enter customer id.',
      pattern: /^[0-9]+$/,
      required: true
    }], function(err, results) {
      return err ? reject(err): resolve(results);
    })
  });
};
