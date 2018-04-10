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
    This command allows user to add a new customer to the database. When running command `#1`, user will be prompted to enter the following:
    ```bash
    Enter Customer Name (First Last):   ///will be split into seperate columns in DB
    Enter Address:                      /// only Street# + Road Name
    Enter City: 
    Enter State:                        ///only uppercase abbreviation (e.g., GA)
    Enter ZIP:                          ///6 digits
    Enter Phone:                        ///10 digit as: 111-222-3333
    ```

    Following prompt input, terminal will send confirmation:
    ```
    <customer name> has been added to the database
    ```
    The prompt will then return to the main menu.

  1. #### Choose active customer

       Select a customer by their id to be used by the rest of the program.  You cannot select a customer that does not exist.
  
  1. #### Create a payment option
      *An `active customer` must be selected to proceed with this process (refer to Option 2 for more information on selecting an active customer)

      Select one of the available payment methods by entering an exact match of the name.  
      
     ```
     AmEx
     ``` 
      
      Enter just the digits of an account number. (Without "-" or spaces) 

      ```
      1234567891011121314
      ```  
      
      The following message should display:  

      ```
      [payment name] payment added
      ```

  1. #### Add product to inventory
    This command allows user to add a new new products to a customer's inventory in the database. When running command `#4`, user will be prompted to enter the following:
        ```bash
    Enter Product Name:
    Enter Product Type:                 /// #1-11
    Enter Price: 
    Enter Brief description:            
    Enter Quantity Available:           ///6 digits
    ```
    
    Following prompt input, terminal will send confirmation:
    ```
    <product name> has been added to line <new product id>
    ```
    The prompt will then return to the main menu.

  1. #### Complete an order
      *An `active customer` must be selected to proceed with this process (refer to Option 2 for more information on selecting an active customer)

      Given a customer has an open order, with products on the order, entering this option will display the following message:

      ```
      Bangazon Corp:  Your order total is [customer's order total]. Please select Y or N to confirm or cancel payment (Y/N):
      ```

      Here you must select "Y" in uppercase to continue. "N" will return to the main menu.

      If "Y" is selected, a list of the active customer's payments types will appear with the following message:

      ```
      AmEx 55502077
      PayPal 77676200
      Bangazon Corp:  Enter desired payment type account number: 
      ```

      Here, a listed account _number_ must be correctly typed or an error message will be given.

      Given a correct account number is entered, the order will be complete, a payment type added to the order making no products available to be added to the order, and quantities for the purchased items inventory will be reduced based on quanitity purchased and the following message will display:

      ```
      Order payment successful
      ```

      Upon completion, the main menu will appear again.

  1. #### See product popularity
  1. #### View stale products
  1. #### Update a product
      *An `active customer` must be selected to proceed with this process (refer to Option 2 for more information on selecting an active customer)
      
      Select one of the available products by entering the corresponding list number.  
      Enter the number for the desired attribute to update. i.e. ```1```  
      Enter the new value.   
      The following message should display (followed by the Main Menu):  

      ```
      [product attribute] updated
      ```

  1. #### Remove a product
      - Choose an active customer by selecting num. `2` from the list
      - You will be given a list of customers.  Choose which one to be made active
      - Once an active customer is choosen, you will be brought back to the main menu
      - Navigate to **remove customer**, which is labeled as num. `9`
      - Once that is selected, you will be given a list of products that can be deleted
      - Choose a product to be removed
      
  1. #### Add to cart
      *An `active customer` must be selected to proceed with this process (refer to Option 2 for more information on selecting an active customer)

      Select a product by entering the corresponding list number.  
      The following message should display (followed by the Main Menu):  

      ```
      Product added to order
      ```

  1. #### View Customer Revenue
    *After an `active customer` has been selected (command `#2` in Bangazon Main Menu), you can view the accrued revenue for specified customer, printing:
      - individual products per order (including quanity purchased in order + accrued total of the purchased product quantity)
      -  total revenue from all of customer's purchased products on all orders from Bangazon

    When initiating command `#11` in main menu, after activating a customer, a table of accrued revenue will be printed to the terminal, (e.g., revenue table for customer `#8` -- Ben Gentle):

    ```
    Order#4
    ----------------------------------------------------
    Fantastic Wooden Shoes          1          $379

    Order#10
    ----------------------------------------------------
    Refined Fresh Tuna              1          $39

    Order#13
    ----------------------------------------------------
    Ergonomic Frozen Chicken        1          $126

    Order#14
    ----------------------------------------------------
    Ergonomic Frozen Chicken        1          $126

    Total revenue: $670
    ```

    After the table is printed to the terminal, the main menu will print (following the revenue table) and prompt the user to continue with another command
    

  1. #### Leave Bangazon!

## Technologies used
1. [Node](https://nodejs.org/en/)
1. [Prompt](https://www.npmjs.com/package/prompt)
1. [Console.Table](https://www.npmjs.com/package/console.table)
1. [Cliui](https://www.npmjs.com/package/cliui)
1. [Chalk](https://www.npmjs.com/package/chalk)
1. [Colors](https://www.npmjs.com/package/colors)
1. [Sqelectron](https://sqlectron.github.io/)
