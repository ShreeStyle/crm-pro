const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../crm.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('DB connection failed:', err.message);
  } else {
    console.log('Connected to SQLite DB');
  }
});

module.exports = db;
