const db = require('../models/db');

// Get all tasks
exports.getAllTasks = (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get task by ID
exports.getTaskById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Task not found' });
    res.json(row);
  });
};

// Create task
exports.createTask = (req, res) => {
  const { title, description, project_id, department_id, assigned_to, assigned_by, priority, due_date, status } = req.body;
  db.run(
    `INSERT INTO tasks 
      (title, description, project_id, department_id, assigned_to, assigned_by, priority, due_date, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    [title, description, project_id, department_id, assigned_to, assigned_by, priority, due_date, status],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, title, status });
    }
  );
};

// Update task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, assigned_to, priority, due_date, status } = req.body;
  db.run(
    `UPDATE tasks SET title=?, description=?, assigned_to=?, priority=?, due_date=?, status=? WHERE id=?`,
    [title, description, assigned_to, priority, due_date, status, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

// Delete task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};

// Add comment to task
exports.addComment = (req, res) => {
  const { task_id, comment, visibility, created_by } = req.body;
  db.run(
    `INSERT INTO task_comments (task_id, comment, visibility, created_by, created_at) 
     VALUES (?, ?, ?, ?, datetime('now'))`,
    [task_id, comment, visibility, created_by],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Comment added' });
    }
  );
};

// Get comments of a task
exports.getComments = (req, res) => {
  const { task_id } = req.params;
  db.all('SELECT * FROM task_comments WHERE task_id=?', [task_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
