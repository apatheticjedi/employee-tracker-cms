const express = require('express');
const router = express.Router();
const inquirer = require('inquirer');

const introQuestion = [
    {
        type: 'list',
        name: 'todo',
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
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: "What is the employee's role?"
    }, 
    {
        type: 'input',
        name: 'manager',
        message: "Who is the employee's manager?"
    }
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

