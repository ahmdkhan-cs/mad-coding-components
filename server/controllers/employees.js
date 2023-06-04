const Employee = require('../models/Employee');
const { faker } = require('@faker-js/faker');

const getEmployees = async (req, res) => {
    try{
        const {limit, offset} = req.query;

        const [employees, count] = await Promise.all([
            Employee.find().sort({"_id": -1}).skip(offset).limit(limit),
            Employee.count()
        ]);
    
        res.status(200).json({
            employees,
            count
        });
    }catch(err){
        res.status(404).json({error: err.message});
    }
}

const saveEmployee = async (req, res) => {
    try{
        const {name, email, age, city, salary, department, hireDate, phone, address, manager} = req.body;
        const employee = new Employee({
            name,
            email,
            age,
            city,
            salary,
            department,
            hireDate,
            phone,
            address,
            manager
        });

        await employee.save();
        res.send("Employee created!");
    }catch(err){
        res.status(404).json({error: err.message});
    }
}

const addFakeEmployees = async () => {
    try{
        for(let i = 0; i < 100; i++){
            const employee = new Employee({
                name: faker.person.fullName(),
                email: faker.internet.exampleEmail(),
                age: faker.number.int({ min: 20, max: 60 }),
                city: faker.location.city(),
                salary: faker.number.int({ min: 60000, max: 300000 }),
                department: faker.person.jobArea(),
                hireDate: faker.date.past({ years: 20 }),
                phone: faker.phone.number(),
                address: faker.location.streetAddress(),
                manager: faker.person.fullName(),
                _v: 0
            });
            await employee.save();
            console.log('Employee inserted');
        }
    }catch(err){
        res.status(404).json({error: err.message});
    }
}

module.exports = {
    getEmployees,
    saveEmployee,
    addFakeEmployees
};