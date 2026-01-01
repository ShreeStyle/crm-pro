const express = require('express');
const { createPermission, myPermissions } = require('../modules/permissions/permissions.controller');
const { permit } = require('../middlewares/permission.middleware');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

// Apply JWT middleware to all routes
router.use(authenticateJWT);

// Routes
router.post('/', permit('manage_roles'), createPermission);
router.get('/me', myPermissions);

module.exports = router;
