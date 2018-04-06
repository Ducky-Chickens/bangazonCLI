'use strict'; 
const { updateProduct } = require('../app/models/UpdateProduct');
const { assert: { deepEqual, isObject } } = require('chai');

describe('UpdateProduct Module', () => {
  const product = { column: 'product_name', value: 'diggity', prodId: 6 };
  const customer = { id: 2 };

  describe('updateProduct()', () => {

    it('should return an object', () => {
      return updateProduct(customer, product)
      .then(data => {
        isObject(data);
      })
    })

    it('should return an object with a propery of changes equal to 1', () => {
      return updateProduct(customer, product)
      .then(data => {
        deepEqual(data, { changes: 1 });
      })
    })

  })
})