DROP DATABASE IF EXISTS storeinventory;
CREATE DATABASE storeinventory;

USE storeinventory;

CREATE TABLE products
(
    item_id INTEGER(10)
    AUTO_INCREMENT NOT NULL,
    product_name VARCHAR
    (30) NOT NULL,\
    product_sales DECIMAL
    (10,2) NOT NULL,
    department_name VARCHAR
    (20) NOT NULL,
    price DECIMAL
    (10,2) NOT NULL,
    stock_quantity INTEGER
    (10) NOT NULL,
    PRIMARY KEY
    (item_id)
);

    SELECT *
    FROM products;

    INSERT INTO products
        (product_name, product_sales, department_name, price, stock_quantity)
    VALUES
        ('distressed denim', 0, 'bottoms', 29.99, 30),
        ('crop top', 0, 'tops', 14.99, 50),
        ('tank top', 0, 'tops', 8.99, 70),
        ('cut off shorts', 0, 'bottoms', 24.99, 35),
        ('flowy blouse', 0, 'top', 29.99, 35),
        ('maxi', 0, 'dresses', 24.99, 25),
        ('sundress', 0, 'dresses', 24.99, 20),
        ('bodycon', 0, 'dresses', 17.99, 30),
        ('hoodie', 0, 'sweaters', 19.99, 30),
        ('off shoulder sweater', 0, 'sweaters', 24.99, 25),
        ('3-pack underwear', 0, 'underwear', 12.99, 40),
        ('ankle socks', 0, 'underwear', 5.99, 50),
        ('denim vest', 0, 'top', 29.99, 25),
        ('bermuda shorts', 0, 'bottoms', 24.99, 30),
        ('t-shirt', 0, 'tops', 7.99, 50),
        ('pushup bra', 0, 'underwear', 17.99, 50);

    CREATE TABLE departments
    (
        department_id INTEGER(4)
        AUTO_INCREMENT NOT NULL,
        deparment_name VARCHAR
        (30) NOT NULL,
        overhead_costs DECIMAL
        (10,2) NOT NULL,
        total_sales DECIMAL
        (10,2) NOT NULL,
        PRIMARY KEY
        (department_id)
    );

        SELECT *
        FROM departments;

        INSERT INTO departments
            (deparment_name, overhead_costs, total_sales)
        VALUES
            ('bottoms', 100, 200),
            ('tops', 70, 300),
            ('dresses', 80, 250),
            ('sweaters', 75, 150),
            ('underwear', 30, 250);

        