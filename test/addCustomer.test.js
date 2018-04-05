'use strict';

const { Database } = require('sqlite3').verbose();
const path = require('path');

const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));

const addCustomer = require('../app/models/AddCustomer');
const { assert: { equal, deepEqual, isObject } } = require('chai');

let newCustomer = { name: "Fox Mulder", street: "123 Alien Lane", city: "Alexandria", state: "VA", zip: "22206", phone: "123-420-5555" };


/// selects customer data per lastID for deepEqual comparison
const getCustomer = (id) =>{
    return new Promise((resolve, reject) => {
        db.run(`SELECT * FROM customers WHERE customer_id =${id}`,
        (err, customer)=> {
            if (err) return reject(err);
            resolve(customer);
        });
    });
}


describe.skip('AddCustomer', () => {
    it('should return an object', () => {
        return addCustomer(newCustomer)
            .then(cust => {
                isObject(cust);
            });
    });
    it('should return an ID matching the appropriate row on products', () => {
        return addCustomer(newCustomer)
        .then(cust=>{
            newCustomer.customer_id = cust.id;
            getCustomer(cust.id)
            .then(thisCustomer => deepEqual(newCustomer, thisCustomer));
        });
    });
});