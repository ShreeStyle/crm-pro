const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Attendance logs
router.get('/', attendanceController.getAllAttendance);
router.post('/', attendanceController.addAttendance);

// Attendance comments
router.post('/comments', attendanceController.addAttendanceComment);
router.get('/:attendance_id/comments', attendanceController.getAttendanceComments);

// Leave requests
router.get('/leaves', attendanceController.getAllLeaves);
router.get('/leaves/:id', attendanceController.getLeaveById);
router.post('/leaves', attendanceController.createLeave);
router.put('/leaves/:id/status', attendanceController.updateLeaveStatus);

// Leave comments
router.post('/leaves/comments', attendanceController.addLeaveComment);
router.get('/leaves/:leave_id/comments', attendanceController.getLeaveComments);

module.exports = router;
