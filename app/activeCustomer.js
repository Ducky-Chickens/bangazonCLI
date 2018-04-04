'use strict';
const assert = require('assert');

/**
 * @function 
 * @description holds information about the current customer
 * @property {number} id - The id of the active customer.
 */
const activeCustomer = {
  id: null,
};

/**
 * @function 
 * @description Sets the current active customer
 * @param {number} id - The id of the customer that should be active.
 * @example 
 * setActiveCustomer(5);
 */
module.exports.setActiveCustomer = id => {
  
  // assert that id must be an integer
  assert.equal(Number.isInteger(id), true);

  activeCustomer.id = id;
};

/**
 * @function 
 * @description Gets the current active customer
 * @property {number} id - The id of the customer to set to be active.
 * @example 
 * getActiveCustomer();
 * @returns {number}
 */
module.exports.getActiveCustomer = () => {
  return activeCustomer;
};
