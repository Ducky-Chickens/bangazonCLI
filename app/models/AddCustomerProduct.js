"use strict"

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

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