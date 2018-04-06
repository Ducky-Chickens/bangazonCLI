'use strict';
const { Database } = require('sqlite3').verbose();
const path = require('path');
const { removeProduct, getProducts, setActiveCustomer, getActiveCustomer } = require('../activeCustomer');

const db = new Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));



//Delete a product
module.exports.removeProduct = (id) => {
  return new Promise ((resolve, reject) => {
    db.run(`DELETE FROM products WHERE product_id=${id}`, 
    function(err, product) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};

//Get products in order to list products to be removed
module.exports.getProducts = (id) => {
  return new Promise ((reject, resolve) => {
    db.all(`select * from products where customer_id = ${id}`, (prods, err) => {
      if (err) reject(err);
      resolve(prods);
    });
  });
};

module.exports.getOrders = (id) => {
  return new Promise ((reject, resolve) => {
    db.all(`select order_id from order_products
    where product_id = ${id}`, (orders, err) => {
      if (err) reject(err);
      resolve(orders);
    });
  });
};