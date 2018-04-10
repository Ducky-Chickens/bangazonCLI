'use strict';
const { Database } = require('sqlite3').verbose();
const path = require('path');

const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

module.exports.getCustomer = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM customers WHERE customer_id =${id}`,
      (err, customer) => {
        if (err) return reject(err);
        resolve(customer);
      });
  });
}