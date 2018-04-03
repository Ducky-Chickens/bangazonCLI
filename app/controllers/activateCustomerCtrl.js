'use strict';
const prompt = require('prompt');

/**
 * @function
 * @name generatePossibleIdRegex
 * @returns {regegx}
 * @param {number} customerCount 
 */
const generatePossibleIdRegex = customerCount => {

    // Create the ids as a list seperated with the | operators 
    // to check if the value is between 0 and the max number (customerCount).
    // Because with only regex, a number range is hard to do dynamically.
    const possibleIds = [];
    for (let i = 1; i < customerCount; i++) {
        possibleIds.push(i);
    }
    return new RegExp(`^(${possibleIds.join('|')})$`);
};

/**
 * @function
 * @name promptActivateCustomer
 * @description Used to intake customer id for activate customer.
 * @returns promise with a prompt.get in it.
 * @param - amount of customers
 */
module.exports = customerCount => {
    return new Promise((resolve, reject) => {
        prompt.get([{
            name: 'customerId',
            description: 'Enter customer id.',
            pattern: generatePossibleIdRegex(customerCount),
            required: true
        }], function (err, results) {
            return err ? reject(err) : resolve(results);
        })
    });
};
