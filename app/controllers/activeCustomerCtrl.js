'use strict';
const prompt = require('prompt');
const getCustomers = require('../models/GetCustomers');
const addSpace = require('../helpers/addSpace');
const { setActiveCustomer } = require('../activeCustomer');


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
    for (let i = 1; i <= customerCount; i++) {
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
const promptActivateCustomer = customerCount => {
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

/**
 * @function
 * @name activateCustomer
 * @description starts the active customer schema and deals with its logic.
 * @returns {Promise} - resolves when customer is activated.
 */
module.exports = () => {
    return new Promise((resolve, reject) => {
        getCustomers().then(customers => {

            // List of customer ids
            for (let customer of customers) {
                customer = addSpace(customer, ['id']);
                console.log(`${customer.id}.`, customer.name);
            }

            promptActivateCustomer(customers.length)
                .then(({ customerId }) => {
                    const customer = customers.find(({ id }) => +id === +customerId);

                    setActiveCustomer(+customer.id, customer.name);
                    resolve();
                });
        });
    });
};