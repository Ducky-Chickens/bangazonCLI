'use strict'; 
const getStaleProducts = require('../app/models/GetStaleProducts');
const { assert: { equal, deepEqual, isArray } } = require('chai');

describe('The stale products module', () => {
    it('should return an array', () => {
        getStaleProducts().then(products => {
            isArray(products);
        });
    });
});