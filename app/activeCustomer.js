'use strict';
/**
 * Holds information about the current customer
 * @property {number} id - The id of the active customer.
 */
let activeCustomer = {
  id: null
}

module.exports.setActiveCustomer = (id) => {
  activeCustomer.id = id;
}

module.exports.getActiveCustomer = () => activeCustomer;
