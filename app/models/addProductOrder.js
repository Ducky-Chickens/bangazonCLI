'use strict';
const { Database } = require('sqlite3').verbose();
const path = require('path');
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');

const db = new Database(path.join(__dirname, '..', '..', 'bangazon.sqlite'));

