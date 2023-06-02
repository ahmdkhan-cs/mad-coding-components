const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    age: {
        type: Number,
    },
    city: String,
    salary: Number,
    department: String,
    hireDate: Date,
    phone: String,
    address: String,
    manager: String
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;