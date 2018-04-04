const { assert: {equal, isFunction, isObject} } = require('chai');
const AddProductOrder = require ('../app/models/AddProductOrder'); 

// Placed here to confirm test file runs properly
  describe('AddProductOrder()', () => {
    let newProduct = {
        product_name: 'spoon',
        product_type: 1,
        price: 30,
        description: 'silver',
        customer_id: 67,
        listing_date: '2019-03-12',
        quantity: 100
      };

      it('should return an object', () => {
          isObject(AddProductOrder(newProduct))
        })
      });
