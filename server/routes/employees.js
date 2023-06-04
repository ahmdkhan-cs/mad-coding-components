const express = require('express');
const { getEmployees, saveEmployee } = require('../controllers/employees')


const router = express.Router();

router.get('/', getEmployees);
router.post('/', saveEmployee);

module.exports = router;