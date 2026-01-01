const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// Projects CRUD
router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectById);
router.post('/', projectsController.createProject);
router.put('/:id', projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

// Project assignments
router.post('/assign-user', projectsController.assignUserToProject);
router.get('/:project_id/users', projectsController.getProjectUsers);

module.exports = router;
