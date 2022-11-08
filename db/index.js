//We gonna require the connection to mysql, please edit your values in the file
const dbConnection = require("../config/connection.js");

//We create an object so this object can connected to out database and use it the query
class Database {
    constructor(dbConnection){
        this.dbConnection = dbConnection;
    }
    //We select the department.id and name from our data base department (Check the schema file for names)
    showAllDepartments(){
        return this.dbConnection.query(`
        SELECT department.id, department.dept_name FROM department`)
    }
    //From our roles db we gonna select all the values of the table and join the department database so we can see the various departments
    showAllRoles(){
        return this.dbConnection.query(`
        SELECT roles.id, roles.title, roles.salary, roles.department_id,
        department.dept_name

        FROM roles

        JOIN department ON roles.department_id = department.id
        `)
    }
    //From our employee table we gonna select all their values
    //And also we gonna join the roles and departments in the others tables
    showAllEmployees(){
        return this.dbConnection.query(`
        SELECT 
        employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name, roles.salary
        FROM employee
        JOIN roles ON employee.role_id = roles.id
        JOIN department ON roles.department_id = department.id
        `)
    }
    //For adding a new department we gonna insert ir into department table with the name dept_name
    //our value will be newDept
    addDepartment(newDept){
        return this.dbConnection.query(`
        INSERT INTO department(dept_name)
        VALUES (?)`, newDept);
    }
        //For adding a new role we gonna insert it into roles table with the three values inside addRole()
    addRole(title, salary, deptID){
        return this.dbConnection.query(`
        INSERT INTO roles(title, salary, department_id)
        VALUES(?,?,?)`, [title, salary, deptID])
    }
    addEmployee(firstName, lastName, role){
        return this.dbConnection.query(`
        INSERT INTO employee(first_name, last_name, role_id)
        VALUES(?,?,?)`, [firstName, lastName, role])
    }
    updateEmployeeRole(employeeID, roleID){
        return this.dbConnection.query(`
        UPDATE employee
        SET role_id = ?
        WHERE id = ?;`, [roleID, employeeID])
    }
}

module.exports = new Database(dbConnection)