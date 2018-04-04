'use strict';
const prompt = require('prompt');

/**
 * @function
 * @description Call when you want to wait for any input before moving on.
 * @name pressEnterToContinue
 * @returns A promise
 */
module.exports = (message = `Press any key to continue`) => {
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
