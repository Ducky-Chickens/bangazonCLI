'use strict';
const { Database } = require('sqlite3').verbose();
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
const path = require('path');
const db = new Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));


/**
 * @function
 * @name getStaleProducts
 * @param {integer} customerId
 * @description Returns a list of stale products for a given customer
 * @returns {Array.<{product}>} An array of products.
 */
module.exports = customerId => {
    return new Promise((resolve, reject) => {

        // A stale product meeets any of the following criteria:

        // Is stale option 1:  Has never been added to an order, and has been in the system for more than 180 days
        const neverAddedSql = `SELECT P.product_id, P.product_name
        FROM products AS P
        WHERE 
            P.product_id NOT IN (
                SELECT OP.product_id
                FROM order_products AS OP
            )
            AND 
            CAST(JULIANDAY('now') - JULIANDAY(REPLACE(P.listing_date, '/', '-')) as INT) >= 180;`;

        // Is stale option 2:  Has been added to an order, 
        // but the order hasn't been completed(If payment_type is null, it has not been completed.),
        // and the order was created more than 90 days ago
        const addedToNotCompletedOrderSql = `
        SELECT P.product_id, P.product_name
        FROM order_products AS OP 
        INNER JOIN products AS P
            ON P.product_id = OP.product_id
        INNER JOIN orders AS O 
            ON O.order_id = OP.order_id
        WHERE CAST(JULIANDAY('now') - JULIANDAY(O.order_date) as INT) >= 90
            AND O.payment_type IS NULL;`;

        // Is stale option 3:  Has been added to one, 
        // or more orders, and the order were completed, 
        // but there is remaining quantity for the product, 
        // and the product has been in the system for more than 180 days
        const addedToCompleteOrderButRemainingQuantitySQL = ``;


        return db.all(
            `SELECT customer_id AS id, (first_name || ' ' || last_name) AS name]
            FROM customers`,
            (err, products) => {
                return err ? reject(err) : resolve(products);
            });
    });
};




