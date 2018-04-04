const { assert: {equal, deepEqual, isFunction} } = require('chai');
const { promptCompleteOrder } = require('../app/controllers/completeOrderCtrl')
const { checkForOrder, getCustomerPaymentsCount, sumOrderTotal, finalizePaymentType } = require('../app/models/completeOrder');

const activeCustomer = {
  id: null,
};

const ordersId1 = [{customer_id: 1, order_date: "2017-9-22", order_id: 5, payment_type: 12},
  {customer_id: 1, order_date: "2017-10-7", order_id: 6, payment_type: null}, 
  {customer_id: 1, order_date: "2018-2-14", order_id: 15, payment_type: 17 }];


describe('promptCompleteOrder', () => {
  it('should be a function', () => {
    isFunction(promptCompleteOrder());
  });
});

describe('checkForOrder', () => {
  it('should return customers orders', () => {
    return checkForOrder(1)
    .then(orders => {
      deepEqual(orders, ordersId1);
    })
  });
});

describe('sumOrderTotal', () => {
  it('should return sum of customers orders prices', () => {
    return sumOrderTotal(1)
    .then(total => {
      console.log(total);
      equal(total, 1);
    })
  });
});

describe('completeOrder', () => {
  it('completeOrder should be a function', () => {
    isFunction(completeOrder());
  });
});

// describe('finalizePaymentType', () => {
//   it('should patch chosen payment type to order', () => {
//     return getCustomerPaymentsCount()
//     .then(object => {
//       equal(object, ?);
//     })
//   });
// });