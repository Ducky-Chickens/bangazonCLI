"use strict"

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT order_products.order_id "Order#", products.product_name "Product", COUNT(order_products.product_id) "Quantity Sold", SUM(products.price) "Product Revenue"
                FROM order_products
                LEFT JOIN products ON order_products.product_id = products.product_id
                WHERE products.customer_id = ${id}
                GROUP BY(products.product_id)
                ORDER BY "Order#"`, 
            (err, revenue) => {
                if (err) return reject(err);
                resolve(revenue);
        });
    });
};
