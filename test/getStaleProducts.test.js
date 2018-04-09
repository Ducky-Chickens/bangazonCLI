'use strict';
const getStaleProducts = require('../app/models/GetStaleProducts');
const addProduct = require('../app/models/AddCustomerProduct');
const { assert: { equal, deepEqual } } = require('chai');

describe('The stale products module', () => {
  const testUser = {
    id: 100,
  };

  const testProduct = {
    id: testUser.id,
    title: "A test product",
    productTypeId: 1,
    date: "2016-04-09",
    description: "A  test product",
    quantity: 1,
    price: 9.99,
  };

  const emptyTestArray = [];

  const fullTestArray = [
    {
      product_id: 51,
      product_name: 'A test product'
    }
  ];

  it('should deep equal an empty array when no product has been added', () => {
    return getStaleProducts(testUser.id).then(products => {
      deepEqual(products, emptyTestArray);
    });
  });

  it('should deep equal the example array when a product has been added', () => {
    return addProduct(testProduct, testProduct).then(({ id }) => {
      return getStaleProducts(testUser.id).then((products) => {
        deepEqual(products, fullTestArray);
      });
    });
  });
});