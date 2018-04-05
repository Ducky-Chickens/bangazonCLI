'use strict'; 
const prompt = require('prompt');

module.exports.promptChooseProduct = (products) => {
  let list = "";
  products.forEach((product, i) => {
    //build a list of products in format: 1. product.name
    list += `${i+1}. ${product.product_name}\n`
  })
  return new Promise((resolve, reject) => {
    prompt.get({
      name: "productID",
      //add list to prompt description
      description: `Please select a product\n${list}`,
      //check if user input is in valid range
      conform: function(value){
        if(+value > 0 && +value <= products.length) return true;
        return false;
      },
      message: 'Must be an integer within the range of products',
      required: true
    },
    (err, result) => {
      if (err) return reject(err);
      //return selected product using result as index in products array
      resolve(products[+result.productID-1]);
    })
  })
}

module.exports.promptChooseAttribute = (product) => {
  //assign product attributes to corresponding list number
  let attributes = {1: "product_name", 2: "description", 3: "price", 4: "quantity"}

  return new Promise((resolve, reject) => {
    prompt.get({
      name: "column",
      description: `
      1. Change title "${product.product_name}"
      2. Change description "${product.description}"
      3. Change price "${product.price}"
      4. Change quantity "${product.quantity}"`,
      conform: function (value) {
        if (+value > 0 && +value <= 4) return true;
        return false;
      },
      message: 'Must be an integer (1-4)',
      required: true
    },
    (err, result) => {
      if (err) return reject(err);
      //return selected column using result as key of attributes object
      resolve(attributes[+result.column]);
    })
  })
}

module.exports.promptNewValue = (column) => {
  return new Promise((resolve, reject) => {
    prompt.get({
      name: "value",
      description: `Enter new ${column}`,
        // conform: function (value) {
        //   if (+value > 0 && +value <= 4) return true;
        //   return false;
        // },
        // message: 'Must be an integer (1-4)',
        required: true
    },
    (err, result) => {
      if (err) return reject(err);
      resolve({"column": column, "value": result.value});
    })
  })
}