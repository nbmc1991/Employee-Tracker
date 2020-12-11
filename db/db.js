var mysql = require("mysql");
require("dotenv").config();
// var ct = require("console.table");


//setting up connection information for the sqp database
var connection = mysql.createConnection({
    host: "localhost",
    //port
    port: 3306,

    //username
    user: "root",

    //passworkd
    password: "Lucas2018.",
    database: "employee_db"
});
//connect to mysql server and sql database
connection.connect(err => {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    //call function to start

});


module.exports.connection = connection