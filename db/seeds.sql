USE employee_db;

/*These values are for test, upload it with your own values*/

INSERT INTO department (dept_name)
VALUES
    ('Department_test1'),
    ('Department_test2'),
    ('Department_test3'),
    ('Department_test4');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Rol 1', 1000, 1),
    ('Rol 2 :)', 2000, 1),
    ('Rol 3', 100, 1),
    ('Rol 4', 3000, 2),
    ('Rol 5', 70, 2),
    ('Rol 6', 10101010, 3),
    ('Rol 7', 123, 4);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
    ('Primer', 'Primer', 3),
    ('Segundx', 'Segundx', 2),
    ('Tercerx', 'Tercerx', 2),
    ('Cuartx', 'Cuartx', 3),
    ('Quintx', 'Quintx', 1),
    ('Sextx', 'Sextx', 4);