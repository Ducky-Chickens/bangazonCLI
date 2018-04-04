'use strict';
const prompt = require('prompt');

module.exports.addProductCustomer = () => {
  return new Promise( (resolve, reject) => {
    prompt.get([ {
      product_name: {
        description: `Enter the product name`,
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Name must be a string containing only letters',
        required: true
      },
      product_type: {
        description: `Enter the product type`,
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Name must be a string containing only letters',
        required: true
      },
      price: {
        description: `Enter the price`,
        pattern: /^\d+$/,
        message: 'Price must be an integer',
        required: true
      },
      description: {
        description: `Enter the description`,
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Description must be a string containing only letters',
        required: true
      },
      listing_date: {
        description: `Enter the date this listing began`,
        pattern: /^(19|20)[0-9]{2}[- /.]([1-9]|1[012])[- /.]([1-9]|[12][0-9]|3[01])$/,
        message: 'Date must be in the correct format YYYY-M-D',
        required: true
      },
      quantity: {
        description: `Enter the quantity of this product`,
        pattern: /^\d+$/,
        message: 'Quantity must be an integer',
        required: true
      }}], function(err, results) {
        if (err) return reject(err);
        resolve(results);
      })
    });
  };
  