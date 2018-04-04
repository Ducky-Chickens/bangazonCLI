const { assert: {equal, isFunction} } = require('chai');
const { promptCompleteOrder } = require('../app/controllers/completeOrderCtrl')
const { checkForOrder, getCustomerPaymentsCount } = require('../app/models/completeOrder');

const activeCustomer = {
  id: null,
};


describe('complete order controller', () => {
  describe('complete order function', () => {
    it('should be a function', () => {
      isFunction(promptCompleteOrder());
    });
  });
});


describe('complete order model', () => {
  describe('check for order function', () => {
    it('should return potential customer orders', () => {
      return checkForOrder(1)
      .then(orders => {
        equal(orders, 2);
      })
    });
  });
});