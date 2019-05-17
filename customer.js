var mysql = require('mysql');
var inquirer = require('inquirer');
var data = '';
require('dotenv').config();

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.sqlpass,
    database: 'storeinventory'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connection successful');
    createTable();
});

function createTable() {
    connection.query('SELECT * FROM products', function (err, res) {
        console.table(res);
        promptCustomer(res);
    });
}

function promptCustomer(res) {
    data = res;
    inquirer.prompt([{
        type: 'input',
        name: 'selection',
        message: 'What is the ID of the product you would like to purchase? [ or Q to quit ]'
    }]).then(function (answer) {

        var validChoice = false;

        if (answer.selection.toUpperCase() === 'Q') {
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id === parseInt(answer.selection)) {
                validChoice = true;
                promptQuantity(res[i], answer);
                break;
            }
        }
        if (!validChoice) {
            console.log('Not a valid selection.');
            promptCustomer(res);
        }
    })
}

function promptQuantity(product, productList) {
    inquirer.prompt({
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to buy?'
    }).then(function (answer) {
        if (product.stock_quantity >= answer.quantity) {
            connection.query('UPDATE products SET stock_quantity="' + (product.stock_quantity - answer.quantity) + '", product_sales="' + (product.product_sales + answer.quantity * product.price) + '" WHERE item_id="' + product.item_id + '"', function () {
                connection.query('UPDATE departments SET total_sales=total_sales+' + (answer.quantity * product.price) + ' WHERE department_name="' + product.department_name + '"', function () {
                    console.log('Purchased ' + answer.quantity + ' of the item "' + product.product_name + '" for a total of $' + ((answer.quantity * product.price).toFixed(2)) + '.')});
                createTable();
            })
        }
        else if (product.stock_quantity < answer.quantity) {
            console.log('There is only ' + product.stock_quantity + ' left in inventory to buy. Cannot complete purchase.');
            promptCustomer(productList);
        }
    });
}
