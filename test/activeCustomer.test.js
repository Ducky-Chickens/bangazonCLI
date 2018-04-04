const { assert: { equal, deepEqual, isFunction, isArray } } = require('chai');

const { setActiveCustomer, getActiveCustomer, isActiveCustomerSet} = require('../app/activeCustomer');
const getCustomers = require('../app/models/getCustomers');

describe('active customer', () => {
    it('should export a setActiveCustomer function', () => {
        isFunction(setActiveCustomer);
    });

    it('should export a getActiveCustomer function', () => {
        isFunction(getActiveCustomer);
    });

    it('should be equal to null by default', () => {
        const nullCustomer = {
            id: null,
        };
        equal(getActiveCustomer().id, nullCustomer.id);
        equal(isActiveCustomerSet(), false);
    });
    
    it('should be 1 after setting it to 1', () => {
        const customerOne = {
            id: 1,
        };
        setActiveCustomer(1);
        equal(getActiveCustomer().id, customerOne.id);
        equal(isActiveCustomerSet(), true);
    });
});

describe('getCustomers', () => {
    it('should be a function', () => {
        isFunction(getCustomers);
    });
    it('getCustomers should return an array', () => {
        return getCustomers().then(customers => {
            isArray(customers);
        });
    });
});