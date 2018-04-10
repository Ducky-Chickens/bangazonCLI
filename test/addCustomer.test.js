'use strict';
const addCustomer = require('../app/models/AddCustomer');
const { getCustomer } = require('../app/models/Customer');

const { assert: { equal, deepEqual, isObject } } = require('chai');

let newCustomer = { name: "Fox Mulder", street: "123 Alien Lane", city: "Alexandria", state: "VA", zip: "22206", phone: "123-420-5555" };
let testCustomer = { first_name: "Fox", last_name: "Mulder", street: "123 Alien Lane", city: "Alexandria", state: "VA", zip: "22206", phone: "123-420-5555" };


describe('AddCustomer', () => {
    it('should return an object', () => {
        return addCustomer(newCustomer)
            .then(cust => {
                isObject(cust);
            });
    });
    it('should return an ID matching the appropriate row on products', () => {
        return addCustomer(newCustomer)
        .then(cust=>{
            testCustomer.customer_id = cust.id;
            getCustomer(cust.id)
            .then(thisCustomer => deepEqual(testCustomer, thisCustomer));
        });
    });
});
testCustomer