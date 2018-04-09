'use strict'; 
const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

/**
 * @function
 * @name addPaymentType
 * @description Inserts a new payment_type row into the database.
 * @returns {Object.<{id: Number}>} object with id of last entry.
 */
module.exports = ({ id }, { payment, accountNumber }) => {
  return new Promise((resolve, reject) => {
    db.run(`
    INSERT INTO payment_types
    VALUES (null, ${id}, "${payment}", ${accountNumber})
    `,
    function (err) {
      if(err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
};
