'use strict'; 
const addPaymentType  = require('../app/models/AddPaymentType');
const { assert: { equal, deepEqual, isObject } } = require('chai');

describe('AddPaymentType model', () => {
  const newCustPaymentType = {payment: 'AmEx', accountNumber: 123456};
  const activeCustomer = {id: 2};

  describe('addPaymentType()', () => {

    it('should return an object', () => {
      return addPaymentType(activeCustomer, newCustPaymentType)
      .then(data => {
        isObject(data);
      })
    })

    it.skip('should return an id of the last paymentType entered', () => {
      return addPaymentType(activeCustomer, newCustPaymentType)
      .then((data) => {
        deepEqual(data.id, 21);
      })
    })
  })
})