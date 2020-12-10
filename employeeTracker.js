const inquirer = require("inquirer");
const connection = require("./db/db").connection

//start function will prompt user for what action to take
function start() {
    inquirer
        .prompt({
            name: "liketodo",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "Add Roles", "Add Employees", "View All Employees", "View Roles", "View Departments", "Update Employee Roles", "None"]
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
                viewAll("employee");
                start()
            }
            else if (answer.liketodo === "View Roles") {
                viewAll("role");
                start()
            }
            else if (answer.liketodo === "View Departments") {
                viewAll("department");
                start()
            }
            else if (answer.liketodo === "Update Employee Roles") {
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
//add ROLES
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

//view roles
function viewAll(table) {
    connection.query(`SELECT * FROM ${table}`, function (err, res) {
        if (err) throw err;
        console.table(res);

    });
}
//EMPLOYEES
//function to handle adding employees
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "empName",
                message: "What is the first name of the employee you are adding?"

            },
            {
                type: "input",
                name: "empLastName",
                message: "What is the employee's last name?"

            },
            {
                type: "input",
                name: "empRoleId",
                message: "What is the employee's role id?"

            },
            {
                type: "input",
                name: "empManagerId",
                message: "What is the employee's manager id?"

            }
        ]).then(function (newEmp) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: newEmp.empName,
                    last_name: newEmp.empLastName,
                    role_id: newEmp.empRoleId,
                    manager_id: newEmp.empManagerId
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee has been added!");
                    //re prompt
                    start();
                }
            );
        });

}

function updateRoles() {
    viewAll("employee", (returned_results) => {
        // console.log(name)
        // console.log(`There are ${returned_results.length} employees`)
        inquirer.prompt([{
            type: "list",
            name: "employee_id",
            message: "What employee is changing roles?",
            choices: returned_results.map(emp => emp.first_name)
        }, {
            type: "input",
            name: "role_id",
            message: "What is the id for their new role?"
        }]).then(res => {
            update("employee", "role_id", res.role_id, res.employee_id)
        })

    })
}

function update(table_name, column, column_value, item_id) {
    connection.query(`UPDATE ${table_name} SET ${column}=${column_value} WHERE id=${item_id};`, (err, res) => {
        if (err) throw err;
        console.table(res)
        start()
    });
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



start()
