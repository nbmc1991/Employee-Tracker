const inquirer = require("inquirer");
var mysql = require("mysql");
// var inq = require("inquirer");
// var console = require("console.table");


//setting up connection objects neededforconnection
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    //username
    user: "root",

    //passworkd
    password: "Lucas2018.",

    database: "employee_db"
});
connection.connect(err => {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    start();
});

function start() {
    inquirer
        .prompt({
            name: "liketodo",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View Roles", "View Departments", "Add Departments", "Add Roles", "Add Employees", "Update Employee Roles", "None"]
        })
        .then(answer => {
            if (answer.liketodo === "View All Employees") {
                viewEmployee();
            }
            else if (answer.liketodo === "View Roles") {
                viewRoles();
            }
            else if (answer.liketodo === "View Departments") {
                viewDepartments();
            }
            else if (answer.liketodo === "Add Departments") {
                addDepartments();
            }
            else if (answer.liketodo === "Add Roles") {
                addRoles();
            }
            else if (answer.liketodo === "Add Employees") {
                addEmployee();
            }
            else if (answer.liketodo === "Update Empoyee Roles") {
                updateRoles();
            }
        });
}

