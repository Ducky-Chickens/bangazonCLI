'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./bangazon.sqlite');

const addCustomerProduct = require('../app/models/AddCustomerProduct.js');
const { assert: { isObject, deepEqual } } = require('chai');

/// test variables -- data to be inserted
const activeCustomer = {id:8};
const newProduct = { title: 'flerg', productTypeId: 2, price: 400, description: 'feelin the schnaup of the flergs', quantity: 34 }
const returnProd = {product_name: 'flerg', 
                    product_type: 2, 
                    price: 400, 
                    description: 'feelin the schnaup of the flergs', 
                    customer_id: 8, 
                    listing_date: `${new Date().toISOString().split('T')[0]}`, 
                    quantity: 34 };


// model function to retrieve row to be matched with lastID returned
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



describe("add customer products", () => {
    it('should return an object', () => {
        return addCustomerProduct(activeCustomer, newProduct)
            .then(custProd => {
                isObject(custProd)
            });
    })
    /// adds product, then fetches row matching lastID
    /// compares data fetched from table to returnProd
    it('should return object deep equal to expected return', ()=>{
        return addCustomerProduct(activeCustomer, newProduct)
            .then(custProd => {
                getOneProduct(custProd.id)
                .then(prod=> deepEqual(prod, returnProd));
            });
    })
});
