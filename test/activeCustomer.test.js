const { assert: { equal, deepEqual, isFunction } } = require('chai');
const { setActiveCustomer, getActiveCustomer } = require('../app/activeCustomer');

describe('activeCustomer script', () => {
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
        deepEqual(getActiveCustomer(), nullCustomer);
    });
    
    it('should be 1 after setting it to 1', () => {
        const customerOne = {
            id: 1,
        };
        setActiveCustomer(1);
        deepEqual(getActiveCustomer(), customerOne);
    });
});