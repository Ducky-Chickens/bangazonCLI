'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

const getCustomerRevenue = require('../app/models/GetCustomerRevenue.js');
const { assert: { isArray, deepEqual } } = require('chai');

describe.skip("getCustomerRevenue", () => {
    it('should return an Array', () => {
        return addCustomerRevenue(4)
            .then(rev => isArray(rev));
    });
})