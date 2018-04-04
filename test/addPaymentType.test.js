'use strict'; 
const { addCustomerPaymentType } = require('../app/models/AddPaymentType');
const { assert: { equal, deepEqual } } = require('chai');

describe('AddPaymentType model', () => {
  const newCustPaymentType = {payment: 'AmEx', accountNumber: 123456};
  const activeCust = {id: 2};

  describe.skip('addCustomerPaymentType()', () => {
    it('should add a new payment type to the database', () => {
      return addCustomerPaymentType(activeCust, newCustPaymentType)
      .then((data) => {
        deepEqual(data.id, 21);
      })
    })
  })
})