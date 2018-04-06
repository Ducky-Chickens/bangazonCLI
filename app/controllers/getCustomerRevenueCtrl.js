'use strict'

module.exports = (revenue) => {
    // arr.filter((obj, index, array) => array.indexOf(obj) === index);
    // console.log(revenue);
    return new Promise((resolve, reject) => {
    let allOrders = [...new Set(revenue.map(order=>order.order))].sort((a,b)=>a-b);
    let orderSets = [];
    allOrders.forEach(orderID=>{
        let prodsPerOrder = [];
        revenue.forEach(prodOrder=>{
            if(prodOrder.order === orderID) prodsPerOrder.push(prodOrder);
        });
        orderSets.push(prodsPerOrder);
    });
    resolve(orderSets);
    reject(console.log('revenue data failed to resolve'));
    });
}