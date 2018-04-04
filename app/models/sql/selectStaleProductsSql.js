'use strict';
const assert = require('assert');


/**
 * @function
 * @name selectStaleProductsSql
 * @param {integer} customerId - The id of the customer whos stale products you are finding.
 * @description An abstraction of a huge sql statments used to select stale products.
 * @returns Sql code with customer id inserted into the where clause.
 */
module.exports = customerId => {

    // customer id should be integer
    assert.equal(Number.isInteger(customerId), true);

    return `
    -- Has never been added to an order, and has been in the system for more than 180 days
    SELECT P.product_id, P.product_name
        FROM products AS P
        WHERE 
            P.product_id NOT IN (
                SELECT OP.product_id
                FROM order_products AS OP
            )
            AND 
            CAST(JULIANDAY('now') - JULIANDAY(REPLACE(P.listing_date, '/', '-')) as INT) >= 180
            AND P.customer_id = ${customerId}
    UNION ALL 

    -- Has been added to an order, 
    -- but the order hasn't been completed(If payment_type is null, it has not been completed.),
    -- and the order was created more than 90 days ago
        SELECT P.product_id, P.product_name
        FROM order_products AS OP 
        INNER JOIN products AS P
            ON P.product_id = OP.product_id
        INNER JOIN orders AS O 
            ON O.order_id = OP.order_id
        WHERE CAST(JULIANDAY('now') - JULIANDAY(O.order_date) as INT) >= 90
            AND O.payment_type IS NULL
            AND P.customer_id = ${customerId}  
    UNION ALL

    -- Has been added to one, 
    -- or more orders, and the order were completed, 
    -- but there is remaining quantity for the product, 
    -- and the product has been in the system for more than 180 days
    SELECT P.product_id, P.product_name
        FROM order_products AS OP 
        INNER JOIN products AS P
            ON P.product_id = OP.product_id
        INNER JOIN orders AS O 
            ON O.order_id = OP.order_id
        WHERE CAST(JULIANDAY('now') - JULIANDAY(O.order_date) as INT) >= 180
            AND O.payment_type IS NOT NULL 
            AND P.quantity > 0
            AND P.customer_id = ${customerId};
    `;
};