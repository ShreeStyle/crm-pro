const db = require('../models/db');

// Get all projects
exports.getAllProjects = (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get project by ID
exports.getProjectById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM projects WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Project not found' });
    res.json(row);
  });
};

// Create new project
exports.createProject = (req, res) => {
  const { name, client_user_id, department_id, description, status } = req.body;
  db.run(
    `INSERT INTO projects (name, client_user_id, department_id, description, status, created_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))`,
    [name, client_user_id, department_id, description, status],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, status });
    }
  );
};

// Update project
exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { name, client_user_id, department_id, description, status } = req.body;
  db.run(
    `UPDATE projects SET name=?, client_user_id=?, department_id=?, description=?, status=? WHERE id=?`,
    [name, client_user_id, department_id, description, status, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

// Delete project
exports.deleteProject = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM projects WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};

// Assign user to project
exports.assignUserToProject = (req, res) => {
  const { project_id, user_id, role } = req.body;
  db.run(
    'INSERT INTO project_assignments (project_id, user_id, role) VALUES (?, ?, ?)',
    [project_id, user_id, role],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'User assigned to project' });
    }
  );
};

// Get users assigned to a project
exports.getProjectUsers = (req, res) => {
  const { project_id } = req.params;
  db.all(
    `SELECT u.*, pa.role 
     FROM project_assignments pa 
     JOIN users u ON pa.user_id = u.id 
     WHERE pa.project_id = ?`,
    [project_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};
