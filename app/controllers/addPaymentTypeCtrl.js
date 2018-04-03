'use strict'; 
const prompt = require('prompt');

const paymentSchema = {
  properties: {
    payment: {
      description: `Please choose a payment method
      1. American Express
      2. Master Card
      3. Visa
      4. PayPal`
    }
  }
}