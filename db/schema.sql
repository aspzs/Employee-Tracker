/*Creamos nuestra base de datos aqui*/
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

/*Creamos las tablas con sus diferentes valores y agregando si son int o varchar texto*/
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary INT,

  department_id INT,
  INDEX department_index (department_id),
  CONSTRAINT fk_department_id FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  INDEX role_index (role_id),
  CONSTRAINT fk_role_id FOREIGN KEY (role_id)
  REFERENCES roles(id)
  );
