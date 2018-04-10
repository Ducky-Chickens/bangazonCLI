'use strict'; 
const prompt = require('prompt');

module.exports.promptAvailableProducts = (products) => {
  let list = "";
  //build a list of products with quantity > 0
  let availableProducts = products.filter(prod => prod.quantity > 0);
  availableProducts.forEach((product, i) => {
    list += `${i + 1}. ${product.product_name}\n`
  })
  list += `${availableProducts.length + 1}. Done adding products`

  return new Promise((resolve, reject) => {
    prompt.get({
      name: "productID",
      description: `\n${list}\nPlease select a product:`,
      //check if user input is in valid range
      conform: function (value) {
        if (+value > 0 && +value <= availableProducts.length+1) return true;
        return false;
      },
      message: 'Must be an integer within the range of products',
      required: true
    },
      (err, result) => {
        if (err) return reject(err);
        //return selected product using result as index in products array
        resolve(availableProducts[+result.productID - 1]);
      })
  })
}

