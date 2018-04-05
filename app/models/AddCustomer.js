'use strict';
const { Database } = require('sqlite3').verbose();
const path = require('path');

const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

module.exports = ({ name, street, city, state, zip, phone }) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO customers VALUES(
      ${null},
      "${name.split(" ")[0]}",
      "${name.split(" ")[1]}",
      "${street}",
      "${city}",
      "${state}",
      "${zip}",
      "${phone}"
    )`, function(err){
      if (err) return reject(err);
      resolve({id: this.lastID});
    });
  });
}
