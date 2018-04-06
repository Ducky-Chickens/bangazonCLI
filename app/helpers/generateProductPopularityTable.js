'use strict';


/**
 * @function
 * @name generateTable
 * @param {array} products - product popularity
 * @description outputs onto the console an array in table format
 */
module.exports = (products) => {

    // Set ui here to reset the contents of ui.div each time. 
    // Each time you call ui.div, the new string is added to the
    // previous strings that were outputted. 
    // Each time you run ui.toString(), you get all previous strings. 
    // There is no built in method to clear out the previous string.
    // To fix: find a way to clear out previoulsy added string 
    // that was added by ui.div
    var ui = require('cliui')();


    // padding: [top, right, bottom, left]
    const padding = [0, 0, 0, 2];

    ui.div(
        {
            text: "Product",
            width: 20,
            padding,
        },
        {
            text: "Orders",
            width: 11,
            padding,
        },
        {
            text: "Purchasers",
            width: 15,
            padding,
        },
        {
            text: "Revenue",
            width: 15,
            padding,
        },
    );

    console.log(ui.toString());

    console.log(`  *******************************************************`);

    // Reset cliui div output
    var ui = require('cliui')();

    for (let i = 0; i < products.length; i++) {
        let { Product, Purchasers, Revenue, Orders } = products[i];
        
        // Add row before subtotal to conform to issue ticket requirment.
        const isOnFinalRow = () => i === (products.length - 1);
        if (isOnFinalRow()) {
            ui.div({
                text: `*******************************************************`,
                width: 100,
                padding,
            });
        }

        ui.div(
            {
                text: `${Product}`,
                width: 20,
                padding,
            },
            {
                text: `${Orders}`,
                width: 11,
                padding,
            },
            {
                text: `${Purchasers}`,
                width: 15,
                padding,
            },
            {
                text: `${Revenue}`,
                width: 15,
                padding,
            }
        );

    }
    console.log(ui.toString());

    // Extra enter before command line input to conform to issue specification
    console.log(``);

};