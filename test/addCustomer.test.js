'use strict';

const { Database } = require('sqlite3').verbose();
const path = require('path');

// const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

const { getCustomer } = require('../app/models/Customer')
const addCustomer = require('../app/models/AddCustomer');
const { assert: { equal, deepEqual, isObject } } = require('chai');

let testCustomer = { first_name: "Fox", last_name: "Mulder", street: "123 Alien Lane", city: "Alexandria", state: "VA", zip: "22206", phone: "123-420-5555" };
let newCustomer = { name: "Fox Mulder", street: "123 Alien Lane", city: "Alexandria", state: "VA", zip: "22206", phone: "123-420-5555" };



/// selects customer data per lastID for deepEqual comparison

describe('AddCustomer', () => {
    it('should return an object', () => {
        return addCustomer(newCustomer)
            .then(cust => {
                isObject(cust);
            });
    });
    it('should return an ID matching the appropriate row on customers', () => {
        return addCustomer(newCustomer)
        .then(cust2 => {
            testCustomer.customer_id = cust2.id;
            return getCustomer(cust2.id)
            .then(thisCustomer => {
                deepEqual(testCustomer, thisCustomer);
            })
        });
    });
});