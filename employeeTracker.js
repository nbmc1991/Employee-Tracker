const inquirer = require("inquirer");
const connection = require("./db/db").connection

//start function will prompt user for what action to take
function start() {
    inquirer
        .prompt({
            name: "liketodo",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "Add Roles", "Add Employees", "View All Employees", "View Roles", "View Departments", "Update an Employee Role", "None"]
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
            else if (answer.liketodo === "Update an Employee Role") {
                updateEmployeeRole();

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
    let departmentArr = [];
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "roleTitle",
                    message: "What is the title of the role you'd like to add?"
                },
                {
                    type: "input",
                    name: "roleSalary",
                    message: "What is the salary for the role you are adding?",
                    validate: function (salary) {
                        if (isNaN(salary) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    type: "rawlist",
                    name: "deptName",
                    choices: () => {
                        for (var i = 0; i < res.length; i++) {
                            departmentArr.push(res[i].name);
                        }
                        return departmentArr;
                    },
                    message: "Which department would you like to assign role to?",
                },
            ]).then((newRole) => {
                let indexDepartment = departmentArr.indexOf(newRole.deptName);
                let deptId = res[indexDepartment].id;
                connection.query(
                    "INSERT INTO role SET?",
                    {
                        title: newRole.roleTitle,
                        salary: newRole.roleSalary,
                        department_id: deptId,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your role has been added!");
                        //re prompt with start function
                        start();
                    }
                );
            });
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
                message: "What is the employee's first name?"

            },
            {
                type: "input",
                name: "empLastName",
                message: "What is the employee's last name?"

            },
            {
                type: "input",
                name: "empRoleId",
                message: "What is the employee's role id?",
                validate: function (salary) {
                    if (isNaN(salary) === false) {
                        return true;
                    }
                    return ("Numeric values only");
                }

            },
            {
                type: "input",
                name: "empManagerId",
                message: "What is the employee's manager id?",
                validate: function (salary) {
                    if (isNaN(salary) === false) {
                        return true;
                    }
                    return ("Numeric values only");
                }

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

function updateEmployeeRole() {
    let employeeArr = [];
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "rawlist",
                    name: "choice",
                    choices: function () {
                        var employeeArr = [];
                        for (var i = 0; i < res.length; i++) {
                            employeeArr.push({
                                name: `${res[i].first_name} ${res[i].last_name}`,
                                value: res[i].id
                            });
                        }
                        return employeeArr;
                    },
                    message: "Please select the employee you would like to update?"
                },

            ]).then(function (response) {
                var roleArr = [];
                console.log(response)
                let employeeId = response.choice;

                connection.query("SELECT * FROM role", (error, res) => {
                    if (error) throw error;

                    inquirer.prompt([
                        {
                            name: "roleChange",
                            type: "rawlist",
                            choices: () => {
                                for (var i = 0; i < res.length; i++) {
                                    roleArr.push({
                                        name: res[i].title,
                                        value: res[i].id
                                    });
                                }
                                return roleArr;
                            },
                            message: "Which role would you like to change the employee to?",
                        },
                    ]).then((response) => {
                        let updatedRoleId = response.roleChange;
                        connection.query(
                            "UPDATE employee SET ? WHERE ?",
                            [{ role_id: updatedRoleId }, { id: employeeId }],
                            (err, res) => {
                                console.log("Yor employee role has been updated!");
                                start();
                            }
                        );
                    });
                });
            });
    });


};

// function update(table_name, column, column_value, item_id) {
//     connection.query(`UPDATE ${table_name} SET ${column}=${column_value} WHERE id=${item_id};`, (err, res) => {
//         if (err) throw err;
//         console.table(res)
//         start()
//     });
// }
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
