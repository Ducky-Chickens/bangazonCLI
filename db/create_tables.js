const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');

const custData = require('../data/customers.js');
const orderProdData = require('../data/orderProducts');;
const orderData = require('../data/orders');;
const prodTypeData = require('../data/productTypes');
const payData = require('../data/paymentTypes');
const prodData = require('../data/products');



module.exports = () => db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS customers`);
    db.run(
        `CREATE TABLE IF NOT EXISTS customers (
        customer_id INTEGER PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        street TEXT,
        city TEXT,
        state TEXT,
        zip TEXT,
        phone TEXT
        )`,
        () => {
            custData.customers.forEach(({ firstName, lastName, street, city, state, zip, phone }) => {
                db.run(`INSERT INTO customers VALUES (
                    ${null},
                    "${firstName}",
                    "${lastName}",
                    "${street}",
                    "${city}",
                    "${state}",
                    "${zip}",
                    "${phone}"
                    )`);
            });
        }
    );
    db.run(`DROP TABLE IF EXISTS product_types`);
    db.run(
        `CREATE TABLE IF NOT EXISTS product_types (
            type_id INTEGER PRIMARY KEY,
            name TEXT
        )`,
        () => {
            prodTypeData.productTypes.forEach(({ name }) => {
                db.run(`INSERT INTO product_types VALUES(
                        ${null},
                        "${name}"
                    )`);
            });
        });
    db.run(`DROP TABLE IF EXISTS payment_types`)
    db.run(
        `CREATE TABLE IF NOT EXISTS payment_types (
            payment_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            method TEXT,
            account_number INTEGER
        )`,
        () => {
            payData.paymentTypes.forEach(({ customerId, type, accountNumber }) => {
                db.run(`INSERT INTO payment_types VALUES(
                        ${null},
                        ${customerId},
                        "${type}",
                        ${accountNumber}
                    )`);
            });
        });
    db.run(`DROP TABLE IF EXISTS products`)
    db.run(
        `CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY,
            product_name TEXT,
            product_type INTEGER,
            price INTEGER,
            description TEXT,
            customer_id INTEGER,
            listing_date TEXT,
            quantity INTEGER
        )`,
        () => {
            prodData.products.forEach(({ title, price, productTypeId, customerId, description, dateCreated, quantity }) => {
                db.run(`INSERT INTO products VALUES(
                        ${null},
                        "${title}",
                        ${productTypeId},
                        ${price},
                        "${description}",
                        ${customerId},
                        "${dateCreated}",
                        ${quantity}
                    )`);
            });
        });
    db.run(`DROP TABLE IF EXISTS orders`);
    db.run(
        `CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            payment_type INTEGER,
            order_date TEXT,
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
            FOREIGN KEY (payment_type) REFERENCES payment_types(payment_id) 
        )`,
        () => {
            orderData.orders.forEach(({ customerId, orderDate, paymentTypeId }) => {
                db.run(`INSERT INTO orders VALUES(
                        ${null},
                        ${customerId},
                        ${paymentTypeId},
                        "${orderDate}"
                    )`);
            });
        }
    );
    db.run(`DROP TABLE IF EXISTS order_products`);
    db.run(`CREATE TABLE IF NOT EXISTS order_products (
        line_id INTEGER PRIMARY KEY,
        order_id INTEGER,
        product_id INTEGER,
        product_value REAL
    )`,
        () => {
            orderProdData.order_products.forEach(({ orderId, productId, productValue }) => {
                db.run(`INSERT INTO order_products VALUES (
                        ${null},
                        ${orderId},
                        ${productId},
                        ${productValue}
                )`);
            });
        });
});

