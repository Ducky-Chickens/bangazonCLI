'use strict'

module.exports = (revenue) => {
    // arr.filter((obj, index, array) => array.indexOf(obj) === index);
    console.log(revenue);
    let allOrders = [...new Set(revenue.map(order=>order.order))].sort((a,b)=>a-b);
    let orderSets = [];
    allOrders.forEach(order=>{

    });
    console.log(orderSets);
}