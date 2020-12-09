const inquirer = require("inquirer");
var mysql = require("mysql");
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
            choices: ["Add Department", "Add Roles", "View All Employees", "View Roles", "View Departments", "Add Employees", "Update Employee Roles", "None"]
        })
        .then(answer => {
            if (answer.liketodo === "Add Departments") {
                addDepartment();
            }
            else if (answer.liketodo === "Add Roles") {
                addRoles();
            }
            else if (answer.liketodo === "Add Employees") {
                addEmployee();
            }
            else if (answer.liketodo === "View All Employees") {
                viewAllEmployees();
            }
            else if (answer.liketodo === "View Roles") {
                viewRoles();
            }
            else if (answer.liketodo === "View Departments") {
                viewDepartments();
            }
            else if (answer.liketodo === "Update Empoyee Roles") {
                updateRoles();
            }
        });
}

function viewRoles() {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        var roleArr = [];
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
        console.table("Roles", [roleArr]);
        start();
    })


}



function viewAllEmployees() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        let employeeArr = [];
        let employee = {};
        for (var i = 0; i < res.length; i++) {
            employeeArr.push(`${res[i].first_name}${res[i].last_name}`);
        }
    });
};


