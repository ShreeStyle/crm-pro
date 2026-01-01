const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes (CommonJS style)
const usersRoutes = require('./routes/users');
const rolesRoutes = require('./routes/roles.routes'); // ✅ updated to your file
const permissionsRoutes = require('./routes/permissions.routes'); // ✅ updated
const departmentsRoutes = require('./routes/departments');
const salesRoutes = require('./routes/sales');
const projectsRoutes = require('./routes/projects');
const tasksRoutes = require('./routes/tasks');
const attendanceRoutes = require('./routes/attendance');
const eodRoutes = require('./routes/eods');
const uploadsRoutes = require('./routes/uploads');
const attachmentsRoutes = require('./routes/attachments');

// Use routes
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);           // ✅ roles
app.use('/api/permissions', permissionsRoutes); // ✅ permissions
app.use('/api/departments', departmentsRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/eods', eodRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/attachments', attachmentsRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('CRM Backend is running!');
});
const authRoutes = require('./routes/auth.routes');

app.use('/api/auth', authRoutes);

module.exports = app;
