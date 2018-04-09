'use strict';
const prompt = require('prompt');

/**
 * @function
 * @description Call when you want to wait for any input before moving on.
 * @name pressEnterToContinue
 * @param {string} [message = 'Press any key to continue'] Message to be displayed before asking user to press any key.
 * @returns {promise}
 */
module.exports = (message = `  Press enter to continue`) => {
    console.log(message);
    return new Promise((resolve, reject) => {
        prompt.get([
            {
                name: ' ',
                description: ``,
                message: ``
            },
        ],
            (err, results) => {
                return err ? reject(err) : resolve(err);
            })
    });
}
