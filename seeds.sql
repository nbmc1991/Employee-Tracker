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
 VALUES ("Financial Advisor", 589000, 32);
 INSERT INTO role(title,salary,department_id)
 VALUES ("Sales Advisor", 299000,45);
 INSERT INTO role(title,salary,department_id)
 VALUES("Trainer Personal", 555555, 55);
 INSERT INTO role(title,salary,department_id)
 VALUES("Civil Engineer", 399999, 65);

 INSERT INTO employee (first_name, last_name,role_id, manager_id)
 VALUES ("Indira", "Cruz", 1001, 1);
 INSERT INTO employee( first_name,last_name,role_id,manager_id)
 VALUES ("Brad", "Pit", 2477, 2);
 INSERT INTO employee(first_name,last_name,role_id,manager_id)
 VALUES("Jason","Statham", 3333, 3);
 INSERT INTO employee(first_name,last_name,role_id,manager_id)
 VALUES("Brenda", "Williams", 2404,4);



