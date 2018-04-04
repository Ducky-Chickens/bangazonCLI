"use strict"

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

module.exports = ({ id }, { title, productTypeId, price, description, dateCreated, quantity}) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO products VALUES(
            null,
            "${title}",
            ${productTypeId},
            ${price},
            "${description}",
            ${id},
            "${dateCreated}",
            ${quantity}
        )`, function(err){
            if (err) return reject(err);
            resolve({ id: this.lastID });
        });
    });
}