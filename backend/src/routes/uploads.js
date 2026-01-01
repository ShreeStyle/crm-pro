const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploadsController');

// Data categories
router.get('/categories', uploadsController.getAllCategories);
router.post('/categories', uploadsController.createCategory);

// Uploaded data
router.get('/', uploadsController.getAllUploadedData);
router.post('/', uploadsController.uploadData);

// Uploaded data sources
router.get('/sources', uploadsController.getAllSources);
router.post('/sources', uploadsController.recordUploadSource);

module.exports = router;
