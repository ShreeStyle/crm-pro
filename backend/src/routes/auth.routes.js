// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();

// Import the auth controller
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

module.exports = router;
