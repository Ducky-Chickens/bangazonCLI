'use strict';
const getProductPopularity = require('../app/models/GetProductPopularity');
const { assert: { equal, deepEqual, isArray } } = require('chai');

describe('Product popularity', () => {
    const exampleUser = {
        id: 4,
    };

    const mostPopularProductExample = [
        {
            product: "Practical Cotton Chair",
            orders: 4,
            purchasers: 2,
            revevnue: 127
        },
        {
            product: "Handmade Granite Ball",
            orders: 1,
            purchasers: 1,
            revevnue: 25
        }
    ];

    it('should return an array', () => {
        getProductPopularity(exampleUser.id).then(products => {
            isArray(products);
        });
    });

    it('should deep equal most popular product exampmle', () => {
        getProductPopularity(exampleUser.id).then(products => {
            deepEqual(products, mostPopularProductExample);
        });
    });
});