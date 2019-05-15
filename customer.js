var mysql = require('mysql');
var inquirer = require('inquirer');
var data = '';

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'storeinventory'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connection successful');
    makeTable();
});

function makeTable() {
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

        if (answer.choice.toUpperCase() === 'Q') {
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id === parseInt(answer.choice)) {
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
    }).then(function(answer) {
        
    })
}
