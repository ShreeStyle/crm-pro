const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../../database/crm.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB error:", err);
  else console.log("DB connected");
});

module.exports = { db };
