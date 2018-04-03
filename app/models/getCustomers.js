'use strict';
const { Database } = require('sqlite3').verbose();
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'bangazon.sqlite'));

/**
 * @function
 * @name getCustomers
 * @description Returns name and id of all customers in the database.
 * @returns {Array.<{id: Number, name: String}>} An array of customer objects with id and name properties.
 */
module.exports = () => {
  return new Promise((resolve, reject) =>
    db.all(
      `SELECT customer_id AS id, (first_name || ' ' || last_name) AS name
      FROM customers`,
      (err, customers) => {
        return err ? reject(err) : resolve(customers);
      })
  );
};


