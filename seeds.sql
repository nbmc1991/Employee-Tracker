USE employee_db;
 
 INSERT INTO department (name)
 VALUES ("Financial");
 INSERT INTO department(name)
 VALUES ("Sales");
 INSERT INTO department(name)
 VALUES("Trainer");
 INSERT INTO department(name)
 VALUES("Engineer")
 
 INSERT INTO role(title, salary, department_id)
 VALUES ("Financial Advisor", 589000, 2);
 INSERT INTO role(title,salary,department_id)
 VALUES ("Sales Advisor", 299000,4);
 INSERT INTO role(title,salary,department_id)
 VALUES("Trainer Personal", 555555, 1);
 INSERT INTO role(title,salary,department_id)
 VALUES("Civil Engineer", 399999, 3);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
 VALUES ("Indira", "Cruz", 1, 1);
 INSERT INTO employee( first_name,last_name,role_id,manager_id)
 VALUES ("Brad", "Pit", 2, 2);
 INSERT INTO employee(first_name,last_name,role_id,manager_id)
 VALUES("Jason","Statham", 3, 3);
 INSERT INTO employee(first_name,last_name,role_id,manager_id)
 VALUES("Brenda", "Williams", 2,4);


