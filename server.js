//Exportamos nuestras dependencias
const inquirer = require('inquirer');
//const mysql = require('mysql2');
require("console.table");
const db = require('./db/index');
const { allDepartments, allRoles, allEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, dbConnection } = require('./db/index.js');


console.log("Initializing");
initQuestions();


//Questions
function initQuestions(){
    inquirer.prompt([
        {
            type : 'list',
            name : 'menu',
            messages: 'Select one option',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Quit'
            ] 
        }
    ])
    .then((choice) => {
        switch(choice.menu) {
            case 'View All Departments':
                console.log("You\'re watching all Departments");
                allDpts();
                break;
            case 'View All Roles':
                console.log("You\'re watching all Roles");
                allRole();
                break;
            case 'View All Employees':
                console.log("You\'re watching all Employees");
                allEmployee();
                break;
            case 'Add a Department':
                console.log("You\'re trying to add a Department");
                addDprmt();
                break;
            case 'Add a Role':
                console.log("You\'re trying to add a Role");
                addRol();
                break;
            case 'Add an Employee':
                console.log("You\'re trying to add an Employee");
                addEmply();
                break;
            case 'Update an Employee Role':
                console.log("You\'re trying to update an Employee Role");
                updateEmplyRole();
                break;
            case 'Quit':
                console.log("Thank you for using me :)");
                process.exit();
        }
    });
};

//Empiezan las funciones
function allDpts(){
    db.showAllDepartments().then(([choice]) => {
        console.table(choice)
    }).then(()=> initQuestions());
};

function allRole(){
    db.showAllRoles().then(([choice]) => {
        console.table(choice)
    }).then(() => initQuestions());
};

function allEmployee(){
    db.showAllEmployees().then(([choice]) => {
        console.table(choice)
    }).then(() => initQuestions());
};

function addDprmt(){
    inquirer.prompt(
        [{
            type: 'input',
            message: 'New Department to add: ',
            name: "dept_name",
        },]
    )
    .then((choice) =>
    db.addDepartment(choice.dept_name))
        
    .then(() => initQuestions());
    };

function addRol(){
    db.showAllDepartments()
    .then(([choice]) => {
        const department = choice.map(({id, dept_name}) => ({
            name: dept_name,
            value: id
        }));

        inquirer.prompt(
            [{
                type: 'input',
                message: 'What\'s the new role you want to add?\n',
                name: 'title',
            },
            {
                type: 'input',
                message: 'Salary for the new role: \n',
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: 'Select the department you want it to add\n',
                name: "dptOption",
                choices: department
            }
        ]
        )
    .then((choice) => {
        db.addRole(choice.title, choice.roleSalary, choice.dptOption)
    })
    .then(() => initQuestions());
    })
};
function addEmply(){
    inquirer.prompt(
        [{
            type: 'input',
            message: 'Write down the Employee\'s first name',
            name: 'first',
        },
        {
            type: 'input',
            message: 'Write down the Employee\'s last name',
            name: 'last',
        }
    ]
    ).then((choice) => {
        let employeeFN = choice.first;
        let employeeLN = choice.last;

        db.showAllRoles().then(([choice]) => {
            const roles = choice.map(({id, title}) =>({
                name: title,
                value: id,
            }));
            inquirer.prompt(
                [{
                    type: 'list',
                    message: 'Enter the role of your new employee',
                    name: 'role',
                    choices: roles
                },]
            ).then(choice => {
                let actRole = choice.role;
                        db.addEmployee(employeeFN, employeeLN,actRole)
                    }).then(() => initQuestions());
                });
            });
        };

function updateEmplyRole(){
    db.showAllEmployees().then(([choice]) => {
        const employees = choice.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }))
        inquirer.prompt(
            [{
                type: 'list',
                message: 'Select your employee',
                choices: employees,
                name: 'employee',
            }]
        ).then((choice) => {
            let employeeID = choice.employee;
            db.showAllRoles().then(([choice]) => {
                const roles = choice.map(({id, title}) => ({
                    name: title,
                    value: id,
                }))
                inquirer.prompt(
                    [{
                        type: 'list',
                        message: 'Select the new role for your employee',
                        choices: roles,
                        name: 'new_role',
                    }]
                ).then((choice) => 
                db.updateEmployeeRole(employeeID, choice.new_role))
                .then(() => initQuestions());
            });
        });
    });
};