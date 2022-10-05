const inquirer = require('inquirer');
const db = require('../db/connection');

let roles = ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'];
let departments = ['Sales', 'Engineering', 'Finance', 'Legal'];
let employees = ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher', 'James Earl Jones', 'Anthony Daniels', 'Peter Cushing', 'Peter Mayhew', 'Alec Guinness']

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
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: "What is the employee's role?",
        choices: roles
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: employees
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
        choices: departments
    }
];

const employeeUpdate = [
    {
        type: 'list',
        name: 'update',
        message: 'Which employee would you like to update?',
        choices: employees
    },
    {
        type: 'list',
        name: 'newRole',
        message: "What is the employee's new role?",
        choices: roles
    }
]

// const getDepartments = () => {
//     const sql = `SELECT dept_name FROM departments`;
//     db.query(sql, (err, rows) => {
//         console.log(rows);
//     });
// };

// const getRoles = () => {
//     db.query(
//         `SELECT title FROM roles`,
//         function (err, results, fields) {
//         });
// };

const addRole = () => {
    inquirer.prompt(roleQuestions)
        .then(data => {
            let role = data.role;
            let salary = data.salary;
            let dept = data.roleDept;
            const sql = `INSERT INTO roles (title, salary, department_id) 
            VALUES ('${role}', ${salary}, ${dept})`;
            db.query(sql, (err, rows) => {
                startApp();
            });
        });
};

const addDept = () => {
    inquirer.prompt(departmentQuestion)
        .then(data => {
            const sql = `INSERT INTO departments (dept_name) VALUES ('${data.department}')`;
            if (!data.department) {
                console.log('Add a department.');
                addDept();
            } else {
                db.query(sql, (err, rows) => {
                    console.log('Department added.');
                    startApp();
                });
            }
        });
};

const addEmployee = () => {
    inquirer.prompt(employeeQuestions)
        .then(data => {
            let firstName = data.firstName;
            let lastName = data.lastName;
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES ('${firstName}', '${lastName}', '')`
            console.table(employeeRole());

        });
};

const viewEmployees = () => {
    const sql = `SELECT employees.*, roles.title
        AS role_title
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        startApp();
    });
};

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        startApp();
    });
};

const viewRoles = () => {
    const sql = `SELECT roles.*, departments.dept_name
        AS department_name
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        console.table(rows);
        startApp();
    });
};

const updateEmployee = () => {
    inquirer.prompt(employeeUpdate)
        .then(data => {
            let employee = data.update;
            let role = data.newRole
            const sql = `UPDATE employees SET role_id = ${role} WHERE id = ${employee}`;
            db.query(sql, (err, rows) => {
            });
        });
    startApp();
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
            } else if (response.start === 'Update an employee role') {
                updateEmployee();
            }
        });
};

module.exports = startApp;