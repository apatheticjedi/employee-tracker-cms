// const express = require('express');
// const router = express.Router();
const inquirer = require('inquirer');
const db = require('../db/connection');

const introQuestion = [
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    }
];

const employeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
    }, 
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?"
    }
    // {
    //     type: 'input',
    //     name: 'employeeRole',
    //     message: "What is the employee's role?"
    // }, 
    // {
    //     type: 'input',
    //     name: 'manager',
    //     message: "Who is the employee's manager?"
    // }
];

const departmentQuestion = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you would like to add?'
    }
];

const roleQuestions = [
    {
        type: 'input',
        name: 'role',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        name: 'roleDept',
        message: 'Which department does the role belong to?',
        choices: ['']
    }
];

const addRole = () => {
    inquirer.prompt(roleQuestions);
};

const addDept = () => {
    inquirer.prompt(departmentQuestion);
};

const employeeRole = () => {
    return this.query(
        `SELECT * FROM roles;`
    );
}

const addEmployee = () => {
    inquirer.prompt(employeeQuestions)
    .then(data => {
        let firstName = data.firstName;
        let lastName = data.lastName;
        console.table(employeeRole());

    });
};

const viewEmployees = () => {
    db.query(
        `SELECT * FROM employees`,
        function(err, results, fields) {
            console.table(results);
            startApp()
        }
    )
};

const viewDepartments = () => {
    db.query(
        `SELECT * FROM departments`,
        function(err, results, fields){
            console.table(results);
            startApp()
        }
    )
};

const viewRoles = () =>{
    db.query(
        `SELECT * FROM roles;`,
        function(err, results, fields){
            console.table(results);
            startApp()
        }
    )
};

const startApp = () => {
    inquirer.prompt(introQuestion)
    .then((response) => {
        if (response.start === 'Quit') {
            console.log('goodbye');
            db.end();
        } else if (response.start === 'Add a department') {
            addDept();
        } else if (response.start === 'Add an employee') {
            addEmployee();
        } else if (response.start === 'Add a role') {
            addRole();
        } else if (response.start === 'View all employees') {
            viewEmployees();
        } else if (response.start === 'View all roles') {
            viewRoles();
        } else if (response.start === 'View all departments') {
            viewDepartments();
        }
    });
};

module.exports = startApp;