"use strict"

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

/**
 * @function
 * @name addCustomerProduct
 * @description adds all data entered by user & actived customer id to a new row on products table
 * @returns {Object.<{id: Number}>} lastID of product table (primary key of newly added row)
 */

module.exports = ({ id }, { title, productTypeId, price, description, quantity}) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO products VALUES(
            null,
            "${title}",
            ${productTypeId},
            ${price},
            "${description}",
            ${id},
            "${new Date().toISOString().split('T')[0]}",
            ${quantity}
        )`, function(err){
            if (err) return reject(err);
            resolve({ id: this.lastID });
        });
    });
}