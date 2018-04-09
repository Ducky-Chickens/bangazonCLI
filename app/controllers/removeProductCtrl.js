'use strict'
const prompt = require('prompt')
const { setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
const { getOrders } = require('../models/removeProduct');



module.exports.removeProductSchema = () => {
  return new Promise((resolve, reject) => {
    prompt.get([ {
      name: 'id',
      description: 'Choose a product to delete:',
      pattern: /^\d+$/,
      message: 'Input must be an integer',
      required: true
    }], function (err, results) {
      if (err) return reject(err)
      resolve(results)
    })
  })
}
