'use strict';
const getProductPopularity = require('../app/models/GetProductPopularity');
const { assert: { equal, deepEqual, isArray } } = require('chai');
const addProduct = require('../app/models/AddCustomerProduct');
const { addOrderProduct, addOrder } = require('../app/models/AddOrderProduct');

const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../../', 'bangazon.sqlite'));


describe('Product popularity', () => {

    const testUser = {
        id: 100,
    };

    const testObject = {
        title: "Test Product",
        productTypeId: 2,
        price: 9.99,
        description: "A test product.",
        quantity: 1,
    };

    const testOrder = {
        price: 25,
    };

    const emptyProductList = [
        {
            Product: "Total:",
            Orders: 0,
            Purchasers: 0,
            Revenue: 0,
        },
    ];

    it('should deep equal emptyProductList before any products have been added', () => {
        return getProductPopularity(testUser.id).then(products => {
            deepEqual(products, emptyProductList);
        });
    });

    const mostPopularProductExample = [
        { Product: 'Test Product', Purchasers: 1, Revenue: 25, Orders: 1 },
        { Product: 'Total:', Purchasers: 1, Revenue: 25, Orders: 1 },
    ];


    it('should deep equal "most popular product example"', () => {
        return addOrder(testUser.id).then(order => {
            return addProduct(testUser, testObject)
            .then(product => addOrderProduct(testUser.id, { orderId: order.id, prodId: product.id, price: testOrder.price}))
            .then(() => getProductPopularity(testUser.id))
            .then(products => {
                deepEqual(products, mostPopularProductExample);
            });
        })
        
    });

    after(function () {

        // reset database
        require('../db/database.js');
    });

});