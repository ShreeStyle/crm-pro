const { db } = require('../../config/db');

// CREATE PERMISSION
const createPermission = async (req, res) => {
  const { key, description } = req.body;
  await db.run(
    'INSERT INTO permissions (key, description) VALUES (?, ?)',
    [key, description]
  );
  res.json({ message: 'Permission created' });
};

// GET MY PERMISSIONS
const myPermissions = async (req, res) => {
  res.json({
    roles: req.user.roles,
    permissions: req.user.permissions
  });
};

module.exports = {
  createPermission,
  myPermissions
};
