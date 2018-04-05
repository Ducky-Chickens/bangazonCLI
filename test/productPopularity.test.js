'use strict'; 
const getProductPopularity = require('../app/models/GetProductPopularity');
const { assert: { equal, deepEqual, isArray } } = require('chai');

describe('Product popularity', () => {
    const exampleUser = {
        id: 4,
    };

    it('should return an array', () => {
        getProductPopularity(exampleUser.id).then(products => {
            isArray(products);
        });
    });
});