const db = require('../models/db');

// Get all roles
exports.getAllRoles = (req, res) => {
  db.all('SELECT * FROM roles', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get role by ID
exports.getRoleById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM roles WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Role not found' });
    res.json(row);
  });
};

// Create role
exports.createRole = (req, res) => {
  const { name, is_active } = req.body;
  db.run(
    'INSERT INTO roles (name, is_active, created_at) VALUES (?, ?, datetime("now"))',
    [name, is_active],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, is_active });
    }
  );
};

// Update role
exports.updateRole = (req, res) => {
  const { id } = req.params;
  const { name, is_active } = req.body;
  db.run(
    'UPDATE roles SET name=?, is_active=? WHERE id=?',
    [name, is_active, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

// Delete role
exports.deleteRole = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM roles WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};

// Assign multiple permissions to a role
exports.assignPermissionsToRole = (req, res) => {
  const { role_id, permission_ids } = req.body;
  
  if (!role_id || !permission_ids || !Array.isArray(permission_ids)) {
    return res.status(400).json({ error: 'role_id and permission_ids array are required' });
  }

  // First, delete existing permission assignments for this role
  db.run('DELETE FROM role_permissions WHERE role_id = ?', [role_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Insert new permission assignments
    const stmt = db.prepare('INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)');
    let completed = 0;
    let hasError = false;
    
    permission_ids.forEach((permission_id) => {
      stmt.run([role_id, permission_id], (err) => {
        if (err && !hasError) {
          hasError = true;
          stmt.finalize();
          return res.status(500).json({ error: err.message });
        }
        completed++;
        if (completed === permission_ids.length && !hasError) {
          stmt.finalize();
          res.json({ message: 'Permissions assigned successfully', role_id, permission_ids });
        }
      });
    });
  });
};
