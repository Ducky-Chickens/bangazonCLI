const { assert: {equal, deepEqual, isFunction} } = require('chai');
const { promptCompleteOrder } = require('../app/controllers/completeOrderCtrl')
const { checkForOrder, getCustomerPaymentTypes, sumOrderTotal, finalizePaymentType, getPayTypeByAccountNumber, checkForProducts } = require('../app/models/CompleteOrder');
const createTables = require('../db/create_tables');

const activeCustomer = {
  id: null,
};

const ordersId1 = [ { order_id: 2,
    customer_id: 1,
    payment_type: null,
    order_date: '2017-7-28' },
  { order_id: 5,
    customer_id: 1,
    payment_type: 1,
    order_date: '2017-09-22' },
  { order_id: 12,
    customer_id: 1,
    payment_type: 16,
    order_date: '2017-7-14' },
  { order_id: 14,
    customer_id: 1,
    payment_type: 12,
    order_date: '2018-2-12' }
  ];

const payTypesId1 = [
  {payment_id: 1, customer_id: 1, method: 'AmEx', account_number: 55502077},
  {payment_id: 16, customer_id: 1, method: 'PayPal', account_number: 77676200},  
]

const patchedOrder = [
  {order_id: 2, customer_id: 1, payment_type: 1, order_date: "2017-7-28"}
];

const ordersProductsId1 = [ { line_id: 5, order_id: 1, product_id: 47 } ];



describe('checkForOrder', () => {
  it('should return customers orders', () => {
    return checkForOrder(1)
    .then(orders => {
      deepEqual(orders, ordersId1);
  })
});

describe('getCustomerPaymentTypes', () => {
  it('should return payment types from customer id', () => {
    return getCustomerPaymentTypes(1)
    .then(object => {
      deepEqual(object, payTypesId1);
    });
  });
});

describe('sumOrderTotal', () => {
  it('should return sum of customers orders prices', () => {
    return sumOrderTotal(2)
    .then(sum => {
      equal(sum.total, 867);
    })
  });
});


describe('getPayTypeByAccountNumber', () => {
  it('should return payment type id from payment method and customer id', () => {
    return getPayTypeByAccountNumber(55502077, 1)
    .then(object => {
      equal(object.payment_id, 1);
    })
  });
});

describe('checkForProducts', () => {
  it('should return products from order id', () => {
    return checkForProducts({order_id: 1})
    .then(object => {
      deepEqual(object, ordersProductsId1);
    })
  })
})

describe('finalizePaymentType', () => {
  it('should patch chosen payment type to order - given payment ID then customer ID', () => {
    return finalizePaymentType(1, 1)
    .then(object => {
      equal(object, 1);
    })
  });
});

})