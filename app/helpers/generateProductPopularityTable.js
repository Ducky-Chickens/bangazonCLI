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
        
    var ui = require('cliui')();
    
    for (let { Product, Purchasers, Revenue, Orders } of products) {
                
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
    console.log(`  *******************************************************`);

};