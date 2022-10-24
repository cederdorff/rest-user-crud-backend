const mysql = require("mysql2");
// Read the environment variables
require('dotenv').config();

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    port: '3306',
    user: 'root',
    database: 'users',
    password: 'apples54JellyHorse',
    multipleStatements: true,
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log(err);
        console.log("Connection Failed");
    }
});

module.exports = mysqlConnection;