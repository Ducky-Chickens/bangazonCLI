const { assert: { equal, deepEqual, isFunction, isArray, isObject } } = require('chai');

const {removeProduct, getProducts, getOrders } = require('../app/models/removeProduct');

describe('products model', () => {
  let firstProduct = {
    product_id: 10,
    product_name: 'Handmade Granite Ball',
    product_type: 6,
    price: 899,
    customer_id: 4,
    description: 'Unde fugiat consectetur et eos hic.',
    listing_date: '2018-01-10',
    quantity: 1
  };


describe('removeProduct', () => {
  it('should export a removeProduct function', () => {
    isFunction(removeProduct)
  })

  it('should export a getProducts function', () => {
    isFunction(getProducts)
  })
})


describe('removeProduct()', () => {

  it('should remove a product from the database', () => {
    return removeProduct(10)
      .then(data => {
        return getProducts(4)
          .then(data => {
            let filteredArr = data.filter(product => {
              return product.product_id === 10
            })
            equal(filteredArr.length, 0)
           })
      })
  })
})

describe('getOrders()', () => {
  it('should be a function', () => {
    isFunction(getOrders)
  })
  // it('should be an array', () => {
  //   return getOrders.then(data => {
  //     isObject(data)
      
    })
  })
})
});
