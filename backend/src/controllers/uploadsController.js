const db = require('../models/db');

// -------------------- Data Categories --------------------

// Get all categories
exports.getAllCategories = (req, res) => {
  db.all('SELECT * FROM data_categories', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Create category
exports.createCategory = (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO data_categories (name) VALUES (?)', [name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name });
  });
};

// -------------------- Uploaded Data --------------------

// Get all uploaded data
exports.getAllUploadedData = (req, res) => {
  db.all('SELECT * FROM uploaded_data', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Create uploaded data entry
exports.uploadData = (req, res) => {
  const { name, phone, email, address, city, state, category_id } = req.body;
  db.run(
    `INSERT INTO uploaded_data (name, phone, email, address, city, state, category_id, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    [name, phone, email, address, city, state, category_id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Data uploaded' });
    }
  );
};

// -------------------- Uploaded Data Sources --------------------

// Get all sources
exports.getAllSources = (req, res) => {
  db.all('SELECT * FROM uploaded_data_sources', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Record file upload
exports.recordUploadSource = (req, res) => {
  const { file_name, uploaded_by } = req.body;
  db.run(
    'INSERT INTO uploaded_data_sources (file_name, uploaded_by, uploaded_at) VALUES (?, ?, datetime("now"))',
    [file_name, uploaded_by],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message: 'Upload source recorded' });
    }
  );
};
