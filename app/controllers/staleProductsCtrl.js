'use strict';
const { setActiveCustomer, isActiveCustomerSet, getActiveCustomer } = require('../activeCustomer');
const addSpace = require('../helpers/addSpace');
const pressEnterToContinue = require('./pressEnterToContinue');
const getStaleProducts = require('../models/GetStaleProducts');


/**
 * @name viewStaleProducts
 * @function
 * @description outputs stale products of the current user onto the command line.
 * @returns {Promise}
 */
module.exports = () => {
  return new Promise((resolve, rejecdt) => {
    if (isActiveCustomerSet()) {
      getStaleProducts(getActiveCustomer().id).then(products => {
        if (products.length > 0) {

          // Required indent to conform with Joe's CLI code.
          for (let product of products) {
            product = addSpace(product, ['product_id']);
          }

          console.table(products);
        } else {
          console.log(' No stale products');
        }
        pressEnterToContinue().then(() => {
          resolve();
        });
      });
    } else {
      console.log(' Please choose active customer before checking their stale products');
      resolve();
    }
  });
};
