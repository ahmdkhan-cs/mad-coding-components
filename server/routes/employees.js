const express = require('express');
const { getEmployees } = require('../controllers/employees')


const router = express.Router();

router.get('/', getEmployees);

module.exports = router;