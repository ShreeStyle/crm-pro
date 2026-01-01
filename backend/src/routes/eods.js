const express = require('express');
const router = express.Router();
const eodController = require('../controllers/eodController');

// EOD CRUD
router.get('/', eodController.getAllEODs);
router.get('/:id', eodController.getEODById);
router.post('/', eodController.createEOD);
router.put('/:id', eodController.updateEOD);

// EOD comments
router.post('/comments', eodController.addComment);
router.get('/:eod_id/comments', eodController.getComments);

module.exports = router;
