INSERT INTO departments (dept_name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Mark', 'Hamill', 1, NULL),
('Harrison', 'Ford', 2, 1),
('Carrie', 'Fisher', 3, NULL),
('James Earl', 'Jones', 4, 3),
('Anthony', 'Daniels', 5, NULL),
('Peter', 'Cushing', 6, 5),
('Peter', 'Mayhew', 7, NULL),
('Alec', 'Guiness', 8, 7);