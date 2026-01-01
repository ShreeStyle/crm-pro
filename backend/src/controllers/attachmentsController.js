const db = require('../models/db');

// -------------------- Attachments --------------------

// Get all attachments
exports.getAllAttachments = (req, res) => {
  db.all('SELECT * FROM attachments', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get attachments by entity
exports.getAttachmentsByEntity = (req, res) => {
  const { entity_type, entity_id } = req.params;
  db.all('SELECT * FROM attachments WHERE entity_type=? AND entity_id=?', [entity_type, entity_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Upload attachment
exports.uploadAttachment = (req, res) => {
  const { entity_type, entity_id, file_path, uploaded_by } = req.body;
  db.run(
    `INSERT INTO attachments (entity_type, entity_id, file_path, uploaded_by, uploaded_at)
     VALUES (?, ?, ?, ?, datetime('now'))`,
    [entity_type, entity_id, file_path, uploaded_by],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Attachment uploaded' });
    }
  );
};

// -------------------- Activity Logs --------------------

// Get all activity logs
exports.getAllActivities = (req, res) => {
  db.all('SELECT * FROM activity_logs', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Record an activity
exports.recordActivity = (req, res) => {
  const { user_id, action, entity, entity_id } = req.body;
  db.run(
    `INSERT INTO activity_logs (user_id, action, entity, entity_id, created_at)
     VALUES (?, ?, ?, ?, datetime('now'))`,
    [user_id, action, entity, entity_id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Activity recorded' });
    }
  );
};
