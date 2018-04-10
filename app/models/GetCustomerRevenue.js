"use strict"

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT order_products.order_id "order", products.product_name "product", COUNT(order_products.product_id) "quantity_sold", SUM(products.price) "product_revenue"
                FROM order_products
                LEFT JOIN products ON order_products.product_id = products.product_id
                WHERE products.customer_id = ${id}
                GROUP BY(order_products.line_id)
                ORDER BY "Order#"`, 
            (err, revenue) => {
                if (err) return reject(err);
                resolve(revenue);
        });
    });
};
