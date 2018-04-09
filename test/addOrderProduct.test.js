'use strict';
const { addOrder, addOrderProduct, getActiveOrder } = require('../app/models/AddOrderProduct');
const { assert: { equal, deepEqual, isObject } } = require('chai');

describe('AddOrderProduct model', () => {
  const newOrder = { orderId: 2, prodId: 2, price: 25 };
  const userId = 2;
  const testOrder = {
    order_id: 14,
    customer_id: 1,
    payment_type: null,
    order_date: '2018-2-12'
  }

  describe('addOrder()', () => {

    it('should return an object', () => {
      return addOrder(userId)
        .then(data => {
          isObject(data);
        })
    })

    it.skip('should return an id of the last order entered', () => {
      return addOrder(userId)
        .then((data) => {
          deepEqual(data.id, 22);
        })
    })
  })

  describe('addOrderProduct', () => {
    it('should return an object', () => {
      return addOrderProduct(userId, newOrder)
        .then(data => {
          isObject(data);
        })
    })

    it.skip('should return a line_id of the last order_product entered', () => {
      return addOrderProduct(userId, newOrder)
        .then((data) => {
          deepEqual(data.id, 22);
        })
    })
  })

  describe('getActiveOrder', () => {
    it(`should return an order object equal to the user's active order`, () => {
      return getActiveOrder(1)
        .then(data => {
          deepEqual(data, testOrder);
        })
    })

    it('should return an object with an order_id equal to 2', () => {
      return getActiveOrder(1)
        .then((data) => {
          deepEqual(data.order_id, 14);
        })
    })
  })
})