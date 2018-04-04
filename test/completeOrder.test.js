const { assert: {equal, isFunction} } = require('chai');
const { promptCompleteOrder } = require('../app/controllers/completeOrderCtrl')
const { checkForOrder, getCustomerPaymentsCount } = require('../app/models/completeOrder');

const activeCustomer = {
  id: null,
};


  describe('promptCompleteOrder', () => {
    it('should be a function', () => {
      isFunction(promptCompleteOrder());
    });
  });


  describe('checkForOrder', () => {
    it('should return potential customer orders', () => {
      return checkForOrder(1)
      .then(orders => {
        equal(orders, 2);
      })
    });
  });