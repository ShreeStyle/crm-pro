const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Leads CRUD
router.get('/', salesController.getAllLeads);
router.get('/:id', salesController.getLeadById);
router.post('/', salesController.createLead);
router.put('/:id', salesController.updateLead);
router.delete('/:id', salesController.deleteLead);

// Notes
router.get('/:id/notes', salesController.getNotes);
router.post('/:id/notes', salesController.addNote);

// Status history
router.get('/:id/status-history', salesController.getStatusHistory);

// Assign leads
router.post('/:id/assign', salesController.assignLead);

// Comments
router.get('/:id/comments', salesController.getComments);
router.post('/:id/comments', salesController.addComment);

module.exports = router;
