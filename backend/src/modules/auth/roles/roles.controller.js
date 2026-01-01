const { db } = require('../../../config/db');

// CREATE ROLE
const createRole = async (req, res) => {
  const { name } = req.body;
  await db.run('INSERT INTO roles (name) VALUES (?)', [name]);
  res.json({ message: 'Role created' });
};

// LIST ROLES
const listRoles = async (req, res) => {
  const roles = await db.all('SELECT id, name FROM roles');
  res.json(roles);
};

// ASSIGN PERMISSIONS TO ROLE
const assignPermissionsToRole = async (req, res) => {
  const { roleId } = req.params;
  const { permission_ids } = req.body;

  for (const pid of permission_ids) {
    await db.run(
      'INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
      [roleId, pid]
    );
  }

  res.json({ message: 'Permissions assigned to role' });
};

// REMOVE PERMISSION FROM ROLE
const removePermissionFromRole = async (req, res) => {
  const { roleId, permissionId } = req.params;
  await db.run(
    'DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?',
    [roleId, permissionId]
  );
  res.json({ message: 'Permission removed from role' });
};

module.exports = {
  createRole,
  listRoles,
  assignPermissionsToRole,
  removePermissionFromRole
};
