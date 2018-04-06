'use strict'; 
const getStaleProducts = require('../app/models/GetStaleProducts');
const { assert: { equal, deepEqual, isArray } } = require('chai');

describe.skip('The stale products module', () => {
    it('should return an array', () => {
        return getStaleProducts().then(products => {
            isArray(products);
        });
    });
});