'use strict'

const addCustomerProduct = require('../app/models/AddCustomerProduct.js');
const { assert: { isFunction, isArray, isNumber, isObject, deepEqual } } = require('chai');



describe("add customer products", () => {
    it('should return an integer', () => {
        
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