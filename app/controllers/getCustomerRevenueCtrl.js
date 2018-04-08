'use strict'

const createTable = (orderGroups) => {
    orderGroups.forEach(group => {
        console.log(`Order#${group[0].order}`)
        console.log("-".repeat(52));
        group.forEach(prod=>{
            console.log(prod.product + " ".repeat(32 - prod.product.length) + prod.quantity_sold + " ".repeat(11 - `${prod.quantity_sold}`.length) + "$" + prod.product_revenue);
        });
        process.stdout.write(`\n`);
    });
}

module.exports = (revenue) => {
    // revenue.filter((obj, index, array) => array.indexOf(obj) === index); //tim's method
    let allOrders = [...new Set(revenue.map(order=>order.order))].sort((a,b)=>a-b);
    let orderSets = [];
    allOrders.forEach(orderID=>{
        let prodsPerOrder = [];
        revenue.forEach(prodOrder=>{
            if(prodOrder.order === orderID) prodsPerOrder.push(prodOrder);
        });
        orderSets.push(prodsPerOrder);
    });
    createTable(orderSets);
}

