const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// Tasks CRUD
router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

// Task comments
router.post('/comments', tasksController.addComment);
router.get('/:task_id/comments', tasksController.getComments);

module.exports = router;
