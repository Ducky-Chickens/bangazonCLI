'use strict'; 
const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

module.exports.addCustomerPaymentType = ({ id }, { payment, accountNumber }) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO payment_types
    VALUES (null, ${id}, "${payment}", ${accountNumber})
    `,
    function (err) {
      if(err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
};
