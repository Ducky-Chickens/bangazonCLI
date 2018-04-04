'use strict';
const { Database } = require('sqlite3').verbose();
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
const path = require('path');
const db = new Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));

const getStaleProductsSql = require('./sql/selectStaleProductsSql');


/**
 * @function
 * @name getStaleProducts
 * @param {integer} customerId
 * @description Returns a list of stale products for a given customer
 * @returns {Array.<{product}>} An array of products.
 */
module.exports = customerId => {
    return new Promise((resolve, reject) => {
        return db.all(
            getStaleProductsSql,
            (err, products) => {
                return err ? reject(err) : resolve(products);
            });
    });
};




