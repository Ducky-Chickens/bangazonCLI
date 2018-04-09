# Bangazon

## The Command Line Ordering System

In this group project, you will be allowing a user to interact with a basic product ordering database via a command line interface.

## Ordering System Interface

### Main Menu

```bash
*********************************************************
**  Welcome to Bangazon! Command Line Ordering System  **
*********************************************************
1. Create a customer account
2. Choose active customer
3. Create a payment option
4. Add product to sell
5. Add product to shopping cart
6. Complete an order
7. Remove customer product
8. Update product information
9. Show stale products
10. Show customer revenue report
11. Show overall product popularity
12. Leave Bangazon!
>
```

## Requirements

You will create a series of prompts that will allow the user to create various types of data in your ordering system.

1. Start with writing unit tests. As a group, determine the core functionality of the application. Define classes, controllers and methods that you think you need to build. Do that before writing the implementation code for core logic. DO NOT WRITE TESTS FOR THE USER INTERFACE (menu and prompts).
1. All classes and methods must be fully documented.

## Option 5 - Complete An Order

*An active customer must be selected to proceed with this process (refer to Option 2 for more information on selecting an active customer)

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

------
