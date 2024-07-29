const express = require('express');
const router = express.Router();

let employees = [
    { id: 1, name: 'John Doe', course: 'Math', roll_no: '123' },
    { id: 2, name: 'Jane Doe', course: 'Science', roll_no: '456' },
    { id: 3, name: 'Bob Smith', course: 'History', roll_no: '789' },
];

// Get All Employees Data (Read)
router.get('/', (req, res) => {
    res.json(employees);
});

// Get a Single Employee Record (Read)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Insert a New Employee Record (Create)
router.post('/', (req, res) => {
    const { name, course, roll_no } = req.body;
    const newEmployee = { id: employees.length + 1, name, course, roll_no };
    employees.push(newEmployee);
    res.status(201).json({ message: 'Employee created successfully' });
});

// Update an Employee Record (Update)
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
        const { name, course, roll_no } = req.body;
        employee.name = name;
        employee.course = course;
        employee.roll_no = roll_no;
        res.status(201).json({ message: 'Employee updated successfully' });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Partially Update an Employee Record (Update)
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
        const { name, course, roll_no } = req.body;
        if (name) employee.name = name;
        if (course) employee.course = course;
        if (roll_no) employee.roll_no = roll_no;
        res.status(201).json({ message: 'Employee updated successfully' });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Delete an Employee Record
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employeeIndex = employees.findIndex((emp) => emp.id === id);
    if (employeeIndex !== -1) {
        employees.splice(employeeIndex, 1);
        res.status(204).json({ message: 'Employee deleted successfully' });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

module.exports = router;
