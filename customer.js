// required packages
var mysql = require('mysql');
var inquirer = require('inquirer');
require('dotenv').config();

// connect to mysql database --- password saved in .env file to keep secret
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.sqlpass,
    database: 'storeinventory'
});

// if connection successful, table is created
connection.connect(function (err) {
    if (err) throw err;
    console.log('\n                        --------- Successfully connected to MySQL database. ---------\n');
    createTable();
});

// shows product table from storeinventory sql database
function createTable() {
    connection.query('SELECT * FROM products', function (err, res) {
        console.table(res, ['item_id', 'product_name', 'price', 'stock_quantity']);
        promptCustomer(res);


    });
}

// prompts customer using inquirer
function promptCustomer(res) {
    inquirer.prompt([{
        type: 'input',
        name: 'selection',
        message: '        --------- What is the ID of the product you would like to purchase? [ or Q to quit ]'
    }]).then(function (answer) {

        // sets 'validChoice' to false by default
        var validChoice = false;

        // if 'q' is entered, app closes
        if (answer.selection.toUpperCase() === 'Q') {
            console.log('Goodbye.');
            process.exit();
        }

        // loops through customer input to see if it matches product from database
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id === parseInt(answer.selection)) {
                validChoice = true;
                promptQuantity(res[i], res);
                break;
            }
        }

        // if customer selection does not match an existing product, error message shown and prompt is displayed again
        if (!validChoice) {
            console.log('Not a valid selection.');
            promptCustomer(res);
        }

    })
}

// prompts customer for quantity to purchase
function promptQuantity(product, productList) {
    inquirer.prompt({
        type: 'input',
        name: 'quantity',
        message: '        --------- How many would you like to buy?'
    }).then(function (answer) {

        // if there is enough inventory, products table is updated, total price is shown, and table/prompt are shown again
        if (product.stock_quantity >= answer.quantity) {
            connection.query('UPDATE products SET stock_quantity="' + (product.stock_quantity - answer.quantity) + '", product_sales="' + (product.product_sales + answer.quantity * product.price) + '" WHERE item_id="' + product.item_id + '"', function () {
                connection.query('UPDATE departments SET total_sales=total_sales+' + (answer.quantity * product.price) + ' WHERE department_name="' + product.department_name + '"', function () {
                    console.log('\n          --------- Purchased ' + answer.quantity + ' of the item "' + product.product_name + '" for a total of $' + ((answer.quantity * product.price).toFixed(2)) + '. ---------\n')
                });
                createTable();
            })
        }

        // if there is not enough inventory, message will show and table/prompt will show again
        else if (product.stock_quantity < answer.quantity) {
            console.log('There is only ' + product.stock_quantity + ' left in inventory to buy. Cannot complete purchase.');
            promptCustomer(productList);
        }
    });
}
