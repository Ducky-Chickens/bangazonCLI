'use strict';

const prompt = require('prompt');

module.exports = () => {
  return new Promise( (resolve, reject) => {
    prompt.get([{
      name: 'name',
      description: 'Enter customer name (First Last)',
      pattern: /^([a-zA-Z]+\s){1}([a-zA-Z]+){1}$/,
      message: 'please enter a first and last name as such; e.g. Bill Jones',
      required: true
    }, {
      name: 'street',
      description: 'Enter street address',
      type: 'string',
      required: true
    }, {
      name: 'city',
      description: 'Enter city',
      type: 'string',
      required: true
    }, {
      name: 'state',
      description: 'Enter state',
      type: 'string',
      required: true
    }, {
      name: 'zip',
      description: 'Enter postal code',
      type: 'string',
      required: true
    }, {
      name: 'phone',
      description: 'Enter phone number (xxx-yyy-zzzz)',
      type: 'string',
      required: true
    }], function(err, results) {
      if (err) return reject(err);
      resolve(results);
    })
  });
};
