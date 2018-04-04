'use strict';
const { Database } = require('sqlite3').verbose();
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
const path = require('path');

const db = new Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));

module.exports.checkForOrder = (customerId) => {
  return new Promise ((resolve, reject) => {
    db.all(`SELECT * from orders WHERE customer_id = ${customerId}`, (err, orders) => {
      return err ? reject(err) : resolve(orders);      
    });
  });
};

module.exports.getCustomerPaymentTypes = (customerId) => {
  return new Promise ((resolve, reject) => {
    db.all(`SELECT *
    FROM payment_types 
    WHERE customer_id = ${customerId}`, (err, payTypes) => {
      // console.log('payTypes', payTypes);
      return err ? reject(err) : resolve(payTypes);
    });
  });
};

module.exports.finalizePaymentType = (payId, custId) => {
  return new Promise ((resolve, reject) => {
    db.all(`UPDATE orders 
    SET payment_type_id = ${payId}
    WHERE order_id = ${custId}`, (err, patch) => {
      console.log('patch', patch);
      return err ? reject(err) : resolve(patch);
    });
  });
};

module.exports.sumOrderTotal = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT SUM(price) AS 'total'
    FROM products 
    JOIN orders 
    JOIN order_products 
    WHERE orders.order_id = order_products.order_id
    AND order_products.product_id = products.product_id
    AND orders.customer_id = ${id}`, (err, total) => {
      // console.log('order total', total.total);
      return err ? reject(err) : resolve(total);
    });
  });
};

module.exports.getPayTypeByName = (name) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT payment_id 
    FROM payment_types
    WHERE method = "${name}"`, (err, id) => {
      return err ? reject(err) : resolve(id);
    });
  });
};

module.exports.checkForProducts = (order) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT *
    FROM order_products
    WHERE order_id = ${order.order_id}
    `, (err, products) => {
      return err ? reject(err) : resolve(products);
    })
  })
}