const { assert: {equal, deepEqual, isFunction} } = require('chai');
const { promptCompleteOrder } = require('../app/controllers/completeOrderCtrl')
const { checkForOrder, getCustomerPaymentTypes, sumOrderTotal, finalizePaymentType, getPayTypeByName, checkForProducts } = require('../app/models/completeOrder');
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
    payment_type: 12,
    order_date: '2017-9-22' },
  { order_id: 12,
    customer_id: 1,
    payment_type: 20,
    order_date: '2017-7-14' },
  { order_id: 14,
    customer_id: 1,
    payment_type: null,
    order_date: '2018-2-12' }
  ];

const payTypesId1 = [
  {payment_id: 1, customer_id: 1, method: 'capacitor', account_number: 55502077},
  {payment_id: 16, customer_id: 1, method: 'microchip', account_number: 77676200},  
]

const patchedOrder = [
  {order_id: 4, customer_id: 2, payment_type: 2, order_date: "2018-03-09"}
];

const ordersProductsId1 = [ { line_id: 5, order_id: 1, product_id: 47 } ];



describe.skip('checkForOrder', () => {
  it('should return customers orders', () => {
    return checkForOrder(1)
    .then(orders => {
      deepEqual(orders, ordersId1);
  })
});

describe.skip('getCustomerPaymentTypes', () => {
  it('should return payment types from customer id', () => {
    return getCustomerPaymentTypes(1)
    .then(object => {
      deepEqual(object, payTypesId1);
    });
  });
});

describe.skip('sumOrderTotal', () => {
  it('should return sum of customers orders prices', () => {
    return sumOrderTotal(2)
    .then(sum => {
      equal(sum.total, 867);
    })
  });
});

describe.skip('finalizePaymentType', () => {
  before(done => {
    createTables().then(() => {
      done();
    });
  });
  it('should patch chosen payment type to order - given payment ID then customer ID', () => {
    return finalizePaymentType(2, 2)
    .then(object => {
      deepEqual(object, patchedOrder);
    })
  });
});

describe.skip('getPayTypeByName', () => {
  it('should return payment type id from payment method and customer id', () => {
    return getPayTypeByName('capacitor', 1)
    .then(object => {
      equal(object.payment_id, 1);
    })
  });
});

describe.skip('checkForProducts', () => {
  it('should return products from order id', () => {
    return checkForProducts({order_id: 1})
    .then(object => {
      deepEqual(object, ordersProductsId1);
    })
  })
})

})