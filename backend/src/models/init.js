const db = require('./db');

db.serialize(() => {
  // 1️⃣ users
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    password_hash TEXT,
    status TEXT,
    is_client INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2️⃣ roles
  db.run(`CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    is_active INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 3️⃣ permissions
  db.run(`CREATE TABLE IF NOT EXISTS permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    description TEXT
  )`);

  // 4️⃣ role_permissions
  db.run(`CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INTEGER,
    permission_id INTEGER
  )`);

  // 5️⃣ user_roles
  db.run(`CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER,
    role_id INTEGER
  )`);

  // 6️⃣ departments
  db.run(`CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    head_user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 7️⃣ department_users
  db.run(`CREATE TABLE IF NOT EXISTS department_users (
    department_id INTEGER,
    user_id INTEGER,
    is_team_lead INTEGER
  )`);

  // 8️⃣ sales_data
  db.run(`CREATE TABLE IF NOT EXISTS sales_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    email TEXT,
    business_category TEXT,
    city TEXT,
    state TEXT,
    created_by INTEGER,
    current_status TEXT,
    current_assigned_to INTEGER,
    department_id INTEGER,
    is_locked INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 9️⃣ sales_status_history
  db.run(`CREATE TABLE IF NOT EXISTS sales_status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_data_id INTEGER,
    status TEXT,
    changed_by INTEGER,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 🔟 sales_notes
  db.run(`CREATE TABLE IF NOT EXISTS sales_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_data_id INTEGER,
    user_id INTEGER,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 1️⃣1️⃣ lead_assignments
  db.run(`CREATE TABLE IF NOT EXISTS lead_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_data_id INTEGER,
    from_user INTEGER,
    to_user INTEGER,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 1️⃣2️⃣ lead_comments
  db.run(`CREATE TABLE IF NOT EXISTS lead_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_data_id INTEGER,
    comment TEXT,
    visibility TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 1️⃣3️⃣ projects
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    client_user_id INTEGER,
    department_id INTEGER,
    description TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 1️⃣4️⃣ project_assignments
  db.run(`CREATE TABLE IF NOT EXISTS project_assignments (
    project_id INTEGER,
    user_id INTEGER,
    role TEXT
  )`);

  // 1️⃣5️⃣ tasks
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    project_id INTEGER,
    department_id INTEGER,
    assigned_to INTEGER,
    assigned_by INTEGER,
    priority TEXT,
    due_date DATE,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 1️⃣6️⃣ task_comments
  db.run(`CREATE TABLE IF NOT EXISTS task_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER,
    comment TEXT,
    visibility TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 1️⃣7️⃣ attendance_logs
  db.run(`CREATE TABLE IF NOT EXISTS attendance_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    clock_in DATETIME,
    clock_out DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 1️⃣8️⃣ attendance_comments
  db.run(`CREATE TABLE IF NOT EXISTS attendance_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attendance_id INTEGER,
    comment TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 1️⃣9️⃣ leave_requests
  db.run(`CREATE TABLE IF NOT EXISTS leave_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    from_date DATE,
    to_date DATE,
    reason TEXT,
    status TEXT,
    decided_by INTEGER,
    decided_at DATETIME
  )`);

  // 2️⃣0️⃣ leave_comments
  db.run(`CREATE TABLE IF NOT EXISTS leave_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    leave_id INTEGER,
    comment TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2️⃣1️⃣ eod_reports
  db.run(`CREATE TABLE IF NOT EXISTS eod_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    report_date DATE,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2️⃣2️⃣ eod_comments
  db.run(`CREATE TABLE IF NOT EXISTS eod_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eod_id INTEGER,
    comment TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2️⃣3️⃣ data_categories
  db.run(`CREATE TABLE IF NOT EXISTS data_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);

  // 2️⃣4️⃣ uploaded_data
  db.run(`CREATE TABLE IF NOT EXISTS uploaded_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    category_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2️⃣5️⃣ uploaded_data_sources
  db.run(`CREATE TABLE IF NOT EXISTS uploaded_data_sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT,
    uploaded_by INTEGER,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2️⃣6️⃣ attachments
  db.run(`CREATE TABLE IF NOT EXISTS attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT,
    entity_id INTEGER,
    file_path TEXT,
    uploaded_by INTEGER,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 2️⃣7️⃣ activity_logs
  db.run(`CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT,
    entity TEXT,
    entity_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('All tables created successfully!');
});

module.exports = db;
