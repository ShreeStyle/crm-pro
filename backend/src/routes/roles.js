const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

// Roles CRUD
router.get('/', rolesController.getAllRoles);
router.get('/:id', rolesController.getRoleById);
router.post('/', rolesController.createRole);
router.put('/:id', rolesController.updateRole);
router.delete('/:id', rolesController.deleteRole);
router.post('/assign-permissions', rolesController.assignPermissionsToRole);

module.exports = router;
