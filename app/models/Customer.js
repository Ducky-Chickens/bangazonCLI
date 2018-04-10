'use strict';
const { Database } = require('sqlite3').verbose();
// const { setActiveCustomer, getActiveCustomer } = require('./activeCustomer');
const path = require('path');

const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

db.get(`SELECT * FROM customers`, (customer) => {
  console.log(customer)
});

module.exports.getCustomer = (id) => {
  return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM customers WHERE customer_id =${id}`,
      (err, customer)=> {
          if (err) return reject(err);
          resolve(customer);
      });
  });
}
