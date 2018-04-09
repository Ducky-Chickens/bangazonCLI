'use strict'; 
const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

module.exports.getProductsById = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.all(`
    SELECT * FROM products
    WHERE customer_id=${id}`
    ,(err, products) => {
      if(err) return reject(err);
      resolve(products);
    })
  })
}

module.exports.updateProduct = ({ id }, { column, value, prodId }) => {
  return new Promise((resolve, reject) => {
    //adjust value to be number or string based on property to update
    if(column === 'price' || column === 'quantity'){
      db.run(`
      UPDATE products SET "${column}" = ${+value}
      WHERE customer_id=${id}
      AND product_id = ${prodId}`
      ,function(err) {
        if(err) return reject(err);
        resolve({changes: this.changes});
      })
    } 
    else {
      db.run(`
      UPDATE products SET "${column}" = "${value}"
      WHERE customer_id = ${id}
      AND product_id = ${prodId}`
        , function(err) {
          if (err) return reject(err);
          resolve({changes: this.changes});
        })
    }
  });
};
