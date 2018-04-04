'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

const addCustomerProduct = require('../app/models/AddCustomerProduct.js');
const { assert: { isFunction, isArray, isNumber, isObject, deepEqual } } = require('chai');

const activeCustomer = {id:8};
const newProduct = { title: 'flerg', productTypeId: 2, price: 400, description: 'feelin the schnaup of the flergs', quantity: 34 }
const returnProd = {product_name: 'flerg', 
                    product_type: 2, 
                    price: 400, 
                    description: 'feelin the schnaup of the flergs', 
                    customer_id: 8, 
                    listing_date: `${new Date().toISOString().split('T')[0]}`, 
                    quantity: 34 };


const getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT product_name, product_type, price, description, customer_id, listing_date, quantity
                FROM products 
                WHERE product_id=${id}`, 
        (err, prod)=>{
            if(err) return reject(err);
            resolve(prod);
        })
    });
}

describe.skip("add customer products", () => {
    it('should return an object', () => {
        return addCustomerProduct(activeCustomer, newProduct)
            .then(custProd => {
                console.log(custProd);
                isObject(custProd)
            });
    });
    it('should return object deep equal to expected return', ()=>{
        return addCustomerProduct(activeCustomer, newProduct)
            .then(custProd => {
                getOneProduct(custProd.id)
                .then(prod=> deepEqual(prod, returnProd));
            });
    })
});
