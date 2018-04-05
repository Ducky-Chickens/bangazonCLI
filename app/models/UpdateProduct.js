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

module.exports.updateProduct = ({ id }, { column, value, prodId }) => {
  return new Promise((resolve, reject) => {
    if(column === 'price' || column === 'quantity'){
      db.run(`UPDATE products SET "${column}" = ${+value}
      WHERE customer_id=${id}
      AND product_id = ${prodId}`
      ,(err, data) => {
        if(err) return reject(err);
        resolve(data);
      })
    } 
    else {
      db.run(`UPDATE products SET "${column}" = "${value}"
      WHERE customer_id = ${id}
      AND product_id = ${prodId}`
        , (err, data) => {
          if (err) return reject(err);
          resolve(data);
        })
    }
  });
};
