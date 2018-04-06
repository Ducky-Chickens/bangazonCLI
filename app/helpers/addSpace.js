'use strict';

/**
 * @name addSpace
 * @function
 * @description adds a space before each property.
 * @param {object} object 
 * @param {array<{strinng}>} properties 
 */
module.exports = (object, properties) => {
    assert.equal(Array.isArray(properties), true);

    for (let prop of properties) {
        if (typeof object[prop] !== 'undefined') {

            // To convert value to string to allow padstart
            object[prop] = `${object[prop]}`;

            object[prop] = object[prop].padStart(object[prop].length + 2, " ");
        }
    }

    return object;
};