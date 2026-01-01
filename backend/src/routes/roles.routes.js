const express = require('express');
const {
  createRole,
  listRoles,
  assignPermissionsToRole,
  removePermissionFromRole
} = require('../modules/auth/roles/roles.controller');
const { permit } = require('../middlewares/permission.middleware');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

// Apply JWT middleware to all routes in this file
router.use(authenticateJWT);

// Routes with permission checks
router.post('/', permit('manage_roles'), createRole);
router.get('/', permit('view_roles'), listRoles);
router.post('/:roleId/permissions', permit('manage_roles'), assignPermissionsToRole);
router.delete('/:roleId/permissions/:permissionId', permit('manage_roles'), removePermissionFromRole);

module.exports = router;
