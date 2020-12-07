-- drops the employee_db if it exists currently --
DROP DATABASEIF EXISTS employee_db;
--Creates the "employee_db" database --
CREATE DATABASE employee_db;

--Make it so all the following code will affect employee_db;
USE employee_db;

--Create the table "department" withing employee_db;
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);
--Create "role";
CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

--Create "employee";
CREATE TABLE employee(
    id INT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT
);

