'use strict';
const assert = require('assert');

const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));


/**
 * @function
 * @name getProductPopularity
 * @description Returns an array of the top three most-selling products for a given customer.
 * @returns {Array.<{products}>} lastID of product table (primary key of newly added row)
 * @param {integer} customerId
 */
module.exports = (customerId) => {
    return new Promise((resolve, reject) => {

        assert(Number.isInteger(customerId), true);

        const selectTop3ProductsSql = `
        SELECT Product, Purchasers, ((cast (Revenue as real))*1.00) AS Revenue, Orders FROM (
            SELECT P.product_name AS Product, 
                        count(distinct(O.customer_id)) AS Purchasers, 
                        SUM(OP.product_value) AS Revenue, 
                        count(OP.product_id) AS Orders
                    FROM products AS P
                    INNER JOIN order_products AS OP
                        ON OP.product_id = P.product_id
                    INNER JOIN orders AS O
                        ON O.order_id = OP.order_id
                    WHERE P.customer_id = ${customerId}
                    GROUP BY P.product_name
                    ORDER BY Revenue DESC
                    LIMIT 3)

        -- SQLite does not have rollup to do subtotal.
        UNION ALL
        SELECT "Total:" AS Product, TOTAL(Purchasers) AS Purchasers, TOTAL(Revenue) AS Revenue, TOTAL(Orders) AS Orders FROM (
        SELECT P.product_name AS Product, 
                    count(distinct(O.customer_id)) AS Purchasers, 
                    SUM(OP.product_value) AS Revenue, 
                    count(OP.product_id) AS Orders
                FROM products AS P
                INNER JOIN order_products AS OP
                    ON OP.product_id = P.product_id
                INNER JOIN orders AS O
                    ON O.order_id = OP.order_id
                WHERE P.customer_id = ${customerId}
                GROUP BY P.product_name
                ORDER BY Revenue DESC
                LIMIT 3);`;

        return db.all(
            selectTop3ProductsSql,
            (err, products) => {
                return err ? reject(err) : resolve(products);
            });
    });
};