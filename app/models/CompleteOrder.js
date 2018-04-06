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
      return err ? reject(err) : resolve(payTypes);
    });
  });
};

module.exports.finalizePaymentType = (payId, custId) => {
  return new Promise ((resolve, reject) => {
    db.run(`UPDATE orders 
    SET payment_type = ${payId}
    WHERE customer_id = ${custId}
    AND payment_type is null`, function(err, result) {
      return err ? reject(err) : resolve(this.changes);
    });
  });
};

module.exports.sumOrderTotal = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT SUM(products.price) AS total
    FROM products 
    JOIN orders 
    JOIN order_products 
    WHERE orders.order_id = order_products.order_id
    AND order_products.product_id = products.product_id
    AND orders.order_id = ${id}
    AND orders.payment_type is null`, (err, total) => {
      return err ? reject(err) : resolve(total);
    });
  });
};

module.exports.getPayTypeByAccountNumber = (number, id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT payment_id 
    FROM payment_types
    WHERE account_number = ${number}
    AND customer_id = ${id}`, (err, id) => {
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
    });
  });
};

module.exports.checkProductQuantity = (orderId, productId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT products.quantity as inventory, 
    products.product_id, 
    COUNT(order_products.product_id) as cart_quantity
    FROM products
	  JOIN order_products
    WHERE products.product_id = ${productId}
    AND order_products.order_id = ${orderId}
    AND order_products.product_id = ${productId}`,
    (err, object) => {
      return err ? reject(err) : resolve(object);
    });
  });
};

module.exports.updateProductQuantity = (final, id) => {
  return new Promise((resolve, reject) => {
    db.run(`UPDATE products
    SET quantity = ${final}
    WHERE product_id = ${id}`,
    (err, result) => {
      return err ? reject(err) : resolve(this.changes);
    });
  });
};

// const removeDuplicatesPromises = [];
// removeDuplicates.forEach(item => {
//   removeDuplicatesPromises.push(checkProductQuantity(nullOrders[0].order_id, item));
// });
// Promise.all(removeDuplicatesPromises).then(result => {
//   console.log(result);
//   // productsWithQuantity.forEach(product => {
//   //   console.log(product);
//   //   let final = product.inventory - product.cart_quantity;
//   //   console.log('new quantity', final);
//   //   updateProductQuantity(final, product.product_id)
//   //   .then(results => {
//   //     console.log(' Product quantities updated');
//   //     resolve(results);
//   //   });
//   // });
// })
