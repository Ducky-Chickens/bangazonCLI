'use strict';
const getProductPopularity = require('../app/models/GetProductPopularity');
const { assert: { equal, deepEqual, isArray } } = require('chai');

describe('Product popularity', () => {
    const exampleUser = {
        id: 4,
    };

    const mostPopularProductExample = [
        {
            Product: "Handmade Granite Ball",
            Orders: 1,
            Purchasers: 1,
            Revenue: 25,
        },
        {
            Product: "Practical Steel Towels",
            Orders: 1,
            Purchasers: 1,
            Revenue: 25,
        },
        {
            Product: "Refined Soft Keyboard",
            Orders: 1,
            Purchasers: 1,
            Revenue: 25,
        },
        {
            Product: "Total:",
            Orders: 3,
            Purchasers: 3,
            Revenue: 75,
        },
    ];

    it('should return an array', () => {
        getProductPopularity(exampleUser.id).then(products => {
            isArray(products);
        });
    });

    it('should deep equal "most popular product example"', () => {
        getProductPopularity(exampleUser.id).then(products => {
            deepEqual(products, mostPopularProductExample);
        });
    });
});