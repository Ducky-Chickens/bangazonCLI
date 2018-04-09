# Bangazon Command Line Interface

## About
In this group project,  we allow a user to interact with a basic product ordering database for a customer via a command line interface.

## How To Use For a Customer
1. Clone it down to your computer
1. Run `node run db:reset`
1. Run (`npm i -g` and `bangazon`) or (`node app/cli.js`)
1. To select a current customer
     1. Run `2`
     1. Select a customer by their id from the given list.
1. To select an existing customer
     1. Run `1`
     1. Follow the prompts to create them, then go back to step 4 to select them.
1. You're ready to work for the customer!
## How To Contribute
1. Fork this project to your repo
1. Clone it down to your computer
1. Create a new branch -  `git chekout -b [your new branch name]`
1. Run `npm install`
1. You can test by running `node app/cli.js`
1. You're ready to contribute!


## Main Menu Commands
```bash
*********************************************************
**  Welcome to Bangazon! Command Line Ordering System  **
*********************************************************
  1. Create a customer account
  2. Choose active customer
  3. Create a payment option
  4. Add product to inventory
  5. Complete an order
  6. See product popularity
  7. View stale products
  8. Update a product
  9. Remove a product
  10. Add to cart
  11. Leave Bangazon!

> [input id command]
```
  1. #### Create a customer account
  1. #### Choose active customer

       Select a customer by their id to be used by the rest of the program.  You cannot select a customer that does not exist.
  
  1. #### Create a payment option
  1. #### Add product to inventory
  1. #### Complete an order
  1. #### See product popularity
       View product popularity to show top 3 products and their revenue of given customer.
  1. #### View stale products
       View customers products that are not currently selling.

  1. #### Update a product
  1. #### Remove a product
  1. Clone it down to your computer
1. Run `node run db:reset`
1. Run (`npm i -g` and `bangazon`) or (`node app/cli.js`)
1. To activate a customer
     1. Run `2`
     1. Select a customer by their id from the given list.
1. To select an existing customer
     1. Run `2`
1. Once back at the main menu, you can remove a product from the chosen customer.
     1. Run `9`
1. You will be given a list of products that are able to be removed
     1. Select any product from the list
1. You're ready to work for the customer!
## How To Contribute
1. Fork this project to your repo
1. Clone it down to your computer
1. Create a new branc -  `git chekout -b [your new branch name]`
1. Run `npm instal`
1. You can test by running `node app/cli.js`
1. You're ready to contribute!
  1. #### Add to cart
  1. #### View Customer Revenue
    View total accrued revenue (per product &amp; overall accrued) for active customer
  1. #### Leave Bangazon!

## Technologies used
1. [Node](https://nodejs.org/en/)
1. [Prompt](https://www.npmjs.com/package/prompt)
1. [Console.Table](https://www.npmjs.com/package/console.table)
1. [Cliui](https://www.npmjs.com/package/cliui)
1. [Chalk](https://www.npmjs.com/package/chalk)
1. [Colors](https://www.npmjs.com/package/colors)
1. [Sqelectron](https://sqlectron.github.io/)