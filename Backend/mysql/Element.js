const mysql = require( 'mysql2' );

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'carnibarge97',
    database:'projet7'
} );

module.exports = con;