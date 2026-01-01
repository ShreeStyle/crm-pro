const { db } = require('../config/db');
const bcrypt = require('bcrypt');
const { signToken } = require('../config/jwt');

exports.login = (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email & password required' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  
  db.get(query, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user's roles and permissions
    const rolesQuery = `
      SELECT r.name as role_name 
      FROM user_roles ur 
      JOIN roles r ON ur.role_id = r.id 
      WHERE ur.user_id = ?
    `;
    
    const permissionsQuery = `
      SELECT DISTINCT p.key 
      FROM user_roles ur 
      JOIN role_permissions rp ON ur.role_id = rp.role_id 
      JOIN permissions p ON rp.permission_id = p.id 
      WHERE ur.user_id = ?
    `;

    db.all(rolesQuery, [user.id], (err, roleRows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      db.all(permissionsQuery, [user.id], (err, permRows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        
        const roles = roleRows.map(r => r.role_name);
        const permissions = permRows.map(p => p.key);
        
        const token = signToken({ 
          id: user.id, 
          email: user.email,
          roles,
          permissions
        });
        
        res.json({ token, user: { id: user.id, email: user.email, roles, permissions } });
      });
    });
  });
};
