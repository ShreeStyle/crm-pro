const db = require('../models/db');

// -------------------- Attendance Logs --------------------
exports.getAllAttendance = (req, res) => {
  db.all('SELECT * FROM attendance_logs', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addAttendance = (req, res) => {
  const { user_id, clock_in, clock_out } = req.body;
  db.run(
    `INSERT INTO attendance_logs (user_id, clock_in, clock_out, created_at) 
     VALUES (?, ?, ?, datetime('now'))`,
    [user_id, clock_in, clock_out],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Attendance logged' });
    }
  );
};

exports.addAttendanceComment = (req, res) => {
  const { attendance_id, comment, created_by } = req.body;
  db.run(
    `INSERT INTO attendance_comments (attendance_id, comment, created_by, created_at)
     VALUES (?, ?, ?, datetime('now'))`,
    [attendance_id, comment, created_by],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Comment added' });
    }
  );
};

exports.getAttendanceComments = (req, res) => {
  const { attendance_id } = req.params;
  db.all('SELECT * FROM attendance_comments WHERE attendance_id=?', [attendance_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// -------------------- Leave Requests --------------------
exports.getAllLeaves = (req, res) => {
  db.all('SELECT * FROM leave_requests', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getLeaveById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM leave_requests WHERE id=?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Leave not found' });
    res.json(row);
  });
};

exports.createLeave = (req, res) => {
  const { user_id, from_date, to_date, reason, status } = req.body;
  db.run(
    `INSERT INTO leave_requests (user_id, from_date, to_date, reason, status) 
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, from_date, to_date, reason, status],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Leave request created' });
    }
  );
};

exports.updateLeaveStatus = (req, res) => {
  const { id } = req.params;
  const { status, decided_by } = req.body;
  db.run(
    `UPDATE leave_requests SET status=?, decided_by=?, decided_at=datetime('now') WHERE id=?`,
    [status, decided_by, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
};

exports.addLeaveComment = (req, res) => {
  const { leave_id, comment, created_by } = req.body;
  db.run(
    `INSERT INTO leave_comments (leave_id, comment, created_by, created_at)
     VALUES (?, ?, ?, datetime('now'))`,
    [leave_id, comment, created_by],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: 'Comment added' });
    }
  );
};

exports.getLeaveComments = (req, res) => {
  const { leave_id } = req.params;
  db.all('SELECT * FROM leave_comments WHERE leave_id=?', [leave_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
