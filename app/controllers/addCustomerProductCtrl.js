'use strict';

const prompt = require('prompt');

/**
 * @function
 * @name promptAddCustomerProduct
 * @description Used to intake product data (name, type#, price, description, quantity)
 * @returns promise with compiled object of data entered by user
 */

module.exports = () => {
    return new Promise((resolve, reject) => {
        prompt.get([{
            name: 'title',
            description: 'Enter product name',
            type: 'string',
            required: true
        }, {
            name: 'productTypeId',
            description: 'Enter product type number',
            pattern: /^(1[0-1]|[1-9])$/,
            message: 'please enter appropriate integer value (1-11)',
            required: true,
            before: (value) => +value
        }, {
            name: 'price',
            description: 'Enter product price',
            // type: 'number',
            pattern: /^[1-9]\d*$/,
            message: 'please enter a positive integer value',
            required: true,
            before: (value) => +value
        }, {
            name: 'description',
            description: 'Enter a brief description',
            type: 'string',
            required: true
        }, {
            name: 'quantity',
            description: 'Enter quantity available',
            type: 'number',
            pattern: /^\d+$/,
            required: true
        }], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        })
    });
};
