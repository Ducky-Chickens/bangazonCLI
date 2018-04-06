'use strict'; 
const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

module.exports.getActiveOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`
    SELECT * FROM orders
    WHERE customer_id=${id}
    AND payment_type ISNULL`
    ,(err, order) => {
      if(err) return reject(err);
      resolve(order);
    });
  });
};

module.exports.getProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`
    SELECT * FROM products`
      , (err, products) => {
        if (err) return reject(err);
        resolve(products);
      })
  })
}

module.exports.addOrderProduct = (id, { orderId, prodId, price }) => {
  return new Promise((resolve, reject) => {
    db.run(`
    INSERT INTO order_products
    VALUES (null, ${orderId}, ${prodId}, ${price})
    `,
    function(err) {
      if(err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
};

module.exports.addOrder = (id) => {
  return new Promise((resolve, reject) => {
    let date = new Date;
    db.run(`
    INSERT INTO orders
    VALUES (null, ${id}, null, "${date.toISOString().split('T')[0]}")
    `,
    function(err) {
      if(err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
};