'use strict';

const prompt = require('prompt');

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
            type: 'integer',
            required: true
        }, {
            name: 'price',
            description: 'Enter product price',
            type: 'integer',
            required: true
        }, {
            name: 'description',
            description: 'Enter a brief description',
            type: 'string',
            required: true
        }, {
            name: 'quantity',
            description: 'Enter quantity available',
            type: 'integer',
            required: true
        }], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        })
    });
};
