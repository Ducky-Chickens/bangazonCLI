'use strict'; 
const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

module.exports.getProducts = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products
    WHERE customer_id=${id}`
    ,(err, products) => {
      if(err) return reject(err);
      resolve(products);
    })
  })
}

module.exports.updateProduct = (id, { column, value }) => {
  return new Promise((resolve, reject) => {
    
  });
};
