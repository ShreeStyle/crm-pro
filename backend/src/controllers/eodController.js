const db = require('../models/db');

// -------------------- EOD Reports --------------------

// Get all EOD reports
exports.getAllEODs = (req, res) => {
  db.all('SELECT * FROM eod_reports', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get EOD by ID
exports.getEODById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM eod_reports WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'EOD not found' });
    res.json(row);
  });
};

// Create EOD
exports.createEOD = (req, res) => {
  const { user_id, report_date, content } = req.body;

  // Check if EOD already exists for user on the same date
  db.get(
    'SELECT * FROM eod_reports WHERE user_id=? AND report_date=?',
    [user_id, report_date],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (row) return res.status(400).json({ error: 'EOD already submitted for this date' });

      // Insert new EOD
      db.run(
        `INSERT INTO eod_reports (user_id, report_date, content, created_at, updated_at)
         VALUES (?, ?, ?, datetime('now'), datetime('now'))`,
        [user_id, report_date, content],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ id: this.lastID, message: 'EOD created' });
        }
      );
    }
  );
};

// Update EOD (only same day)
exports.updateEOD = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  // Get EOD report
  db.get('SELECT * FROM eod_reports WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'EOD not found' });

    const today = new Date().toISOString().slice(0, 10);
    if (row.report_date !== today) {
      return res.status(403).json({ error: 'EOD can only be updated on the same day' });
    }

    db.run(
      'UPDATE eod_reports SET content=?, updated_at=datetime("now") WHERE id=?',
      [content, id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
      }
    );
  });
};

// -------------------- EOD Comments --------------------

// Add comment to EOD
exports.addComment = (req, res) => {
  const { eod_id, comment, created_by } = req.body;
  db.run(
    `INSERT INTO eod_comments (eod_id, comment, created_by, created_at)
     VALUES (?, ?, ?, datetime('now'))`,
    [eod_id, comment, created_by],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Comment added' });
    }
  );
};

// Get comments of an EOD
exports.getComments = (req, res) => {
  const { eod_id } = req.params;
  db.all('SELECT * FROM eod_comments WHERE eod_id=?', [eod_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
