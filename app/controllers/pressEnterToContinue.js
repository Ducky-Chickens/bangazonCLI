'use strict';
const prompt = require('prompt');

/**
 * @function
 * @description Call when you want to wait for any input before moving on.
 * @name pressEnterToContinue
 * @returns A promise
 */
module.exports = () => {
    console.log(`Press any key to continue`);
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
