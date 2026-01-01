const db = require('../models/db');

// Get all departments
exports.getAllDepartments = (req, res) => {
  db.all('SELECT * FROM departments', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get department by ID
exports.getDepartmentById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM departments WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Department not found' });
    res.json(row);
  });
};

// Create department
exports.createDepartment = (req, res) => {
  const { name, head_user_id } = req.body;
  db.run(
    'INSERT INTO departments (name, head_user_id, created_at) VALUES (?, ?, datetime("now"))',
    [name, head_user_id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, head_user_id });
    }
  );
};

// Update department
exports.updateDepartment = (req, res) => {
  const { id } = req.params;
  const { name, head_user_id } = req.body;
  db.run(
    'UPDATE departments SET name=?, head_user_id=? WHERE id=?',
    [name, head_user_id, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

// Delete department
exports.deleteDepartment = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM departments WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};

// Add user to department
exports.addUserToDepartment = (req, res) => {
  const { department_id, user_id, is_team_lead } = req.body;

  // Optional: enforce single department per user in app logic
  db.get('SELECT * FROM department_users WHERE user_id=?', [user_id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(400).json({ error: 'User already belongs to a department' });

    db.run(
      'INSERT INTO department_users (department_id, user_id, is_team_lead) VALUES (?, ?, ?)',
      [department_id, user_id, is_team_lead],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User added to department', id: this.lastID });
      }
    );
  });
};

// Assign team lead to a department
exports.assignTeamLead = (req, res) => {
  const { department_id, user_id } = req.body;

  if (!department_id || !user_id) {
    return res.status(400).json({ error: 'department_id and user_id are required' });
  }

  // First, check if user exists in the department
  db.get(
    'SELECT * FROM department_users WHERE department_id=? AND user_id=?',
    [department_id, user_id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) {
        return res.status(404).json({ error: 'User not found in this department' });
      }

      // Remove team lead status from all users in the department
      db.run(
        'UPDATE department_users SET is_team_lead=0 WHERE department_id=?',
        [department_id],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });

          // Assign team lead to the specified user
          db.run(
            'UPDATE department_users SET is_team_lead=1 WHERE department_id=? AND user_id=?',
            [department_id, user_id],
            function(err) {
              if (err) return res.status(500).json({ error: err.message });
              res.json({ message: 'Team lead assigned successfully', department_id, user_id });
            }
          );
        }
      );
    }
  );
};

// Get all users in a department
exports.getDepartmentUsers = (req, res) => {
  const { department_id } = req.params;
  db.all(
    `SELECT u.*, du.is_team_lead 
     FROM department_users du 
     JOIN users u ON du.user_id = u.id 
     WHERE du.department_id = ?`,
    [department_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};
