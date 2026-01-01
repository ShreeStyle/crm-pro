-- ===============================
-- 1️⃣ Users
-- ===============================
INSERT INTO users (name, email, phone, password_hash)
VALUES 
('Admin User', 'admin@example.com', '9999999999', '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); 
-- Replace Xs with a bcrypt-hashed password for testing, e.g., 'admin123'

-- ===============================
-- 2️⃣ Roles
-- ===============================
INSERT INTO roles (name) VALUES ('Admin');
INSERT INTO roles (name) VALUES ('HOD');
INSERT INTO roles (name) VALUES ('Team Lead');
INSERT INTO roles (name) VALUES ('BDE');
INSERT INTO roles (name) VALUES ('Employee');

-- ===============================
-- 3️⃣ Permissions
-- ===============================
INSERT INTO permissions (key, description) VALUES ('manage_roles', 'Create, edit, assign roles');
INSERT INTO permissions (key, description) VALUES ('view_roles', 'View roles');
INSERT INTO permissions (key, description) VALUES ('create_user', 'Create new users');
INSERT INTO permissions (key, description) VALUES ('view_users', 'View user list');
INSERT INTO permissions (key, description) VALUES ('assign_roles', 'Assign roles to users');
INSERT INTO permissions (key, description) VALUES ('view_sales', 'View sales and leads');
INSERT INTO permissions (key, description) VALUES ('assign_leads', 'Assign leads to users');
INSERT INTO permissions (key, description) VALUES ('view_tasks', 'View tasks');

-- ===============================
-- 4️⃣ Role-Permissions mapping
-- ===============================
-- Admin gets all permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 1);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 2);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 3);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 4);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 5);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 6);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 7);
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 8);

-- ===============================
-- 5️⃣ Assign Admin role to user
-- ===============================
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);

