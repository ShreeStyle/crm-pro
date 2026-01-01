const db = require('../models/db');

// Get all permissions
exports.getAllPermissions = (req, res) => {
  db.all('SELECT * FROM permissions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get permission by ID
exports.getPermissionById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM permissions WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Permission not found' });
    res.json(row);
  });
};

// Create permission
exports.createPermission = (req, res) => {
  const { key, description } = req.body;
  db.run(
    'INSERT INTO permissions (key, description) VALUES (?, ?)',
    [key, description],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, key, description });
    }
  );
};

// Update permission
exports.updatePermission = (req, res) => {
  const { id } = req.params;
  const { key, description } = req.body;
  db.run(
    'UPDATE permissions SET key=?, description=? WHERE id=?',
    [key, description, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

// Delete permission
exports.deletePermission = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM permissions WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};
