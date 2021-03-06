'use strict';

const prompt = require('prompt');

module.exports = () => {
  return new Promise( (resolve, reject) => {
    prompt.get([{
      name: 'name',
      description: 'Enter customer name (First Last)',
      pattern: /^([a-zA-Z]+\s){1}([a-zA-Z]+){1}$/,
      message: 'please enter a first and last name; e.g. Bill Jones',
      required: true
    }, {
      name: 'street',
      description: 'Enter street address',
      type: 'string',
      pattern: /^\d+(\s[a-zA-Z]+){2,}$/,
      message: 'please enter your street address: (number) (street)',
      required: true
    }, {
      name: 'city',
      description: 'Enter city',
      type: 'string',
      pattern: /^[a-zA-Z]+$/,
      message: 'please enter an appropriate city name (no numbers, jokester!)',
      required: true
    }, {
      name: 'state',
      description: 'Enter state (abbr, i.e. TN)',
      type: 'string',
      pattern: /\b[A-Z]{2}\b/,
      message: 'please enter the state name in abbreviated & all uppercase format (e.g. KY)',
      required: true
    }, {
      name: 'zip',
      description: 'Enter postal code',
      type: 'string',
      pattern: /\b\d{5}\b/g,
      message: 'please enter a five digit zip code', 
      required: true
    }, {
      name: 'phone',
      description: 'Enter phone number (xxx-yyy-zzzz)',
      type: 'string',
      pattern: /^\d{3}-\d{3}-\d{4}$/,
      message: 'please enter a ten digit phone number, seperated by hyphens',
      required: true
    }], function(err, results) {
      if (err) return reject(err);
      resolve(results);
    })
  });
};
