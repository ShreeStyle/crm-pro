const express = require('express');
const router = express.Router();
const attachmentsController = require('../controllers/attachmentsController');

// Attachments
router.get('/', attachmentsController.getAllAttachments);
router.get('/:entity_type/:entity_id', attachmentsController.getAttachmentsByEntity);
router.post('/', attachmentsController.uploadAttachment);

// Activity Logs
router.get('/activities', attachmentsController.getAllActivities);
router.post('/activities', attachmentsController.recordActivity);

module.exports = router;
