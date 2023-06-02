const express = require('express');
const { getEmployees } = require('../controllers/employees')


const router = express.router();

router.get('/', getEmployees);