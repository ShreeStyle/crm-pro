const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentsController');

// Departments CRUD
router.get('/', departmentsController.getAllDepartments);
router.get('/:id', departmentsController.getDepartmentById);
router.post('/', departmentsController.createDepartment);
router.put('/:id', departmentsController.updateDepartment);
router.delete('/:id', departmentsController.deleteDepartment);

// Department users
router.post('/add-user', departmentsController.addUserToDepartment);
router.post('/assign-team-lead', departmentsController.assignTeamLead);
router.get('/:department_id/users', departmentsController.getDepartmentUsers);

module.exports = router;
