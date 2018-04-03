const { assert: {equal, isFunction} } = require('chai');
const { promptCompleteOrder } = require('../app/controllers/completeOrderCtrl')

const activeCustomer = {
  id: null,
};


describe('complete order module', () => {
  describe('complete order function', () => {
    it('should be a function', () => {
      isFunction(promptCompleteOrder());
    });
  });
});