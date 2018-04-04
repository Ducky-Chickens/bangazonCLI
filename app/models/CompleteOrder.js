'use strict';
const { Database } = require('sqlite3').verbose();
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

module.exports.checkForOrder = (customerId) => {
  return new Promise ((resolve, reject) => {
    db.all(`SELECT * from orders WHERE customer_id = ${customerId}`, (err, orders) => {
      console.log(orders)
      return err ? reject(err) : resolve(orders);      
    });
  })
}

module.exports.getCustomerPaymentsCount = (customerId) => {
  return new Promise ((resolve, reject) => {
    db.all(`SELECT COUNT(payment_id) from payment_types WHERE customer_id = ${customerId}`, (err, payTypeCount) => {
      console.log(payTypeCount)
      return err ? reject(err) : resolve(payTypeCount);
    });
  })
}