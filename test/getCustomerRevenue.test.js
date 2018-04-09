'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

const getCustomerRevenue = require('../app/models/GetCustomerRevenue.js');
const { assert: { isArray, deepEqual } } = require('chai');

describe("getCustomerRevenue", () => {
    it('should return an Array', () => {
        return getCustomerRevenue(5)
            .then(rev => isArray(rev));
    });
    it('should return an array with a length of 4', () => {
        return getCustomerRevenue(5)
            .then(rev => deepEqual(rev.length, 2));
    });
})