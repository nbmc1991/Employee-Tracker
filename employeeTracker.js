const inquirer = require("inquirer");
var mysql = require("mysql");
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
    start();
});

//start function will prompt user for what action to take
function start() {
    inquirer
        .prompt({
            name: "liketodo",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "Add Roles", "View All Employees", "View Roles", "View Departments", "Add Employees", "Update Employee Roles", "None"]
        })
        .then(answer => {
            //based on their answers call the functions that would run for each action if else
            if (answer.liketodo === "Add Department") {
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
            else if (answer.liketodo === "None") {
                connection.end();
            }

        });
}
//function to handle adding departments
function addDepartment() {
    //prompt for info about department
    inquirer
        .prompt({
            name: "deptName",
            type: "input",
            message: "What is the name of the department you would like add?"
        }).then(function (res) {
            var query = connection.query(
                "INSERT INTO department SET ?",
                {
                    name: res.deptName,
                },
                function (error) {
                    if (error) throw error;
                    console.log("Your department was successfully added!");

                    //re prompt user if they would like to do something else
                    start();
                }
            )

        });
}
//ROLES
//function to prompt the user information about adding roles
function addRoles() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "What is the title of the role you'd like to add?"
            },
            {
                type: "input",
                name: "deptId",
                message: "What is the department ID for this role?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary for the role you are adding?",
                validate: function (salary) {
                    if (isNaN(salary) === false) {
                        return true;
                    }
                    return ("Numeric values only");
                }
            }
        ]).then(function (newRole) {
            connection.query(
                "INSERT INTO role SET?",
                {
                    title: newRole.roleTitle,
                    salary: newRole.roleSalary,
                    department_id: newRole.deptId
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your role has been added!");
                    //re prompt with start function
                    start();
                }
            )
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


