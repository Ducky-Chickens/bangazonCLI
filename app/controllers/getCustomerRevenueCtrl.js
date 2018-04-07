'use strict'

const createTable = (order, products) => {
    console.log(`Order#${order}`)
    console.log("-".repeat(50));
}

const splitDataForTable = (orderGroups) => {
    orderGroups.forEach(group => {
    let orderNum = group[0].order;
    let orderProduct = group.map(prod => { delete prod.order; return prod; });
    createTable(orderNum, orderProduct);
    });
}

module.exports = (revenue) => {
    // arr.filter((obj, index, array) => array.indexOf(obj) === index);
    // console.log(revenue);
    let allOrders = [...new Set(revenue.map(order=>order.order))].sort((a,b)=>a-b);
    let orderSets = [];
    allOrders.forEach(orderID=>{
        let prodsPerOrder = [];
        revenue.forEach(prodOrder=>{
            if(prodOrder.order === orderID) prodsPerOrder.push(prodOrder);
        });
        orderSets.push(prodsPerOrder);
    });
    splitTable(orderSets);
}