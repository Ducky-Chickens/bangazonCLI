'use strict'

const addCustomerProduct = require('../app/models/AddCustomerProduct.js');
const { assert: { isFunction, isArray, isNumber, isObject, deepEqual } } = require('chai');

const activeCustomer = {id:8};
const newProduct = { title: 'flerg', productTypeId: 2, price: 400, description: 'feelin the schnaup of the flergs', dateCreated: '2011-03-15', quantity: 34 }


describe("add customer products", () => {
    it('should return an object', () => {
        return addCustomerProduct(activeCustomer, newProduct)
            .then(custProd => {
                console.log(custProd);
                isObject(custProd)
            });
    });
});





// describe.skip("postProgram", () => {
//     it('should return an integer', () => {
//         return postProgram(postObj)
//             .then(programID => isNumber(programID));
//     });
//     it('should match stated post oject', () => {
//         return postProgram(postObj)
//             .then(programID => {
//                 postObj.program_id = programID;
//                 getOneProgram(programID)
//                     .then(program => deepEqual(postObj, program));
//             });
//     });
// });