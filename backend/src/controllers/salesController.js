const db = require('../models/db');

// Get all leads
exports.getAllLeads = (req, res) => {
  db.all('SELECT * FROM sales_data', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get lead by ID
exports.getLeadById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM sales_data WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Lead not found' });
    res.json(row);
  });
};

// Create new lead
exports.createLead = (req, res) => {
  const { name, phone, email, business_category, city, state, created_by, current_status, current_assigned_to, department_id } = req.body;
  db.run(
    `INSERT INTO sales_data 
      (name, phone, email, business_category, city, state, created_by, current_status, current_assigned_to, department_id, is_locked, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, datetime('now'))`,
    [name, phone, email, business_category, city, state, created_by, current_status, current_assigned_to, department_id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const leadId = this.lastID;

      // Insert initial status in sales_status_history
      db.run(
        'INSERT INTO sales_status_history (sales_data_id, status, changed_by, changed_at) VALUES (?, ?, ?, datetime("now"))',
        [leadId, current_status, created_by]
      );

      res.status(201).json({ id: leadId, name, phone, email, current_status });
    }
  );
};

// Update lead
exports.updateLead = (req, res) => {
  const { id } = req.params;
  const { name, phone, email, business_category, city, state, current_status, current_assigned_to } = req.body;

  // First, check if lead is locked
  db.get('SELECT is_locked FROM sales_data WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Lead not found' });
    if (row.is_locked === 1) return res.status(403).json({ error: 'Lead is locked for editing' });

    // Update lead
    db.run(
      `UPDATE sales_data SET name=?, phone=?, email=?, business_category=?, city=?, state=?, current_status=?, current_assigned_to=? WHERE id=?`,
      [name, phone, email, business_category, city, state, current_status, current_assigned_to, id],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });

        // Record status change
        db.run(
          'INSERT INTO sales_status_history (sales_data_id, status, changed_by, changed_at) VALUES (?, ?, ?, datetime("now"))',
          [id, current_status, req.body.updated_by || null]
        );

        res.json({ updated: this.changes });
      }
    );
  });
};

// Delete lead
exports.deleteLead = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM sales_data WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};

// Add note
exports.addNote = (req, res) => {
  const { id } = req.params;
  const { user_id, note } = req.body;
  db.run(
    'INSERT INTO sales_notes (sales_data_id, user_id, note, created_at) VALUES (?, ?, ?, datetime("now"))',
    [id, user_id, note],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Note added' });
    }
  );
};

// Get notes
exports.getNotes = (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM sales_notes WHERE sales_data_id=?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get status history
exports.getStatusHistory = (req, res) => {
  const { id } = req.params;
  db.all(
    'SELECT * FROM sales_status_history WHERE sales_data_id=? ORDER BY changed_at DESC',
    [id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// Assign lead to a user
exports.assignLead = (req, res) => {
  const { id } = req.params;
  const { from_user, to_user } = req.body;

  db.serialize(() => {
    // Lock the lead for previous editor
    db.run('UPDATE sales_data SET is_locked=1, current_assigned_to=? WHERE id=?', [to_user, id]);

    // Insert into lead_assignments
    db.run(
      'INSERT INTO lead_assignments (sales_data_id, from_user, to_user, assigned_at) VALUES (?, ?, ?, datetime("now"))',
      [id, from_user, to_user],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: 'Lead assigned successfully' });
      }
    );
  });
};

// Get comments
exports.getComments = (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM lead_comments WHERE sales_data_id=?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Add comment
exports.addComment = (req, res) => {
  const { id } = req.params;
  const { comment, visibility, created_by } = req.body;
  db.run(
    'INSERT INTO lead_comments (sales_data_id, comment, visibility, created_by, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
    [id, comment, visibility, created_by],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Comment added' });
    }
  );
};
