'use strict';
const assert = require('assert');

/**
 * @function 
 * @description holds information about the current customer
 * @property {number} id - The id of the active customer.
 */
const activeCustomer = {
  id: null,
  fullName: '',
};

/**
 * @function 
 * @description Sets the current active customer
 * @param {number} id - The id of the customer that should be active.
 * @param {string} [fullName=""] - The full name of the customer that should be active.
 * @example 
 * setActiveCustomer(5);
 */
module.exports.setActiveCustomer = (id, fullName = '') => {

  // id should be an integer
  assert.equal(Number.isInteger(id), true);
  
  // fullName should be a string
  assert.equal(typeof fullName === 'string', true);

  activeCustomer.id = id;
  activeCustomer.fullName = fullName;
};

/**
 * @function 
 * @description Gets the current active customer
 * @property {number} id - The id of the customer to set to be active.
 * @example 
 * getActiveCustomer();
 * @returns {customer}
 * @returns customer.id
 * @returns customer.fullName
 */
module.exports.getActiveCustomer = () => {
  return activeCustomer;
};


/**
 * @function
 * @description Checks if an active customer is set.
 * @example 
 * isActiveCustomerSet();
 * @returns {boolean} - true if active customer is set
 */
module.exports.isActiveCustomerSet = () => {
  return activeCustomer.id === null ? false : true;
};
