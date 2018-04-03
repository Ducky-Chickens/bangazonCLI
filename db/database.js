const sqlite3 = require('sqlite3');
const path = require('path');
const createTables = require('../db/create_tables');
let db;

(function createDb() {
  // http://stackoverflow.com/questions/27766734/dealing-with-relative-paths-with-node-js
  db = new sqlite3.Database(path.join(__dirname, '..', 'bangazon.sqlite'), createTables); //you will need to create this callback method
}());

