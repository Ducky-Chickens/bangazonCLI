'use strict';
const { Database } = require('sqlite3').verbose();
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

module.exports = () => {
  return new Promise((resolve, reject) =>
    db.all(
      `SELECT customer_id, (first_name || ' ' || last_name) 
      FROM customers`,
      (err, customers) => {
        return err ? reject(err) : resolve(customers);
      })
  );
};


