const db = require('../models/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // use env variable in production

exports.getAllUsers = (req, res) => {
  db.all('SELECT id, name, email, role FROM users', [], (err, users) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(users);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT id, name, email, role FROM users WHERE id = ?', [id], (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  });
};

exports.createUser = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password required' });
  }
  
  db.run(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role || 'User'],
    function(err) {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ id: this.lastID, name, email, role: role || 'User' });
    }
  );
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  
  db.run(
    'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
    [name, email, role, id],
    function(err) {
      if (err) return res.status(500).json({ message: err.message });
      if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User updated successfully' });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  });
};

exports.assignRolesToUser = (req, res) => {
  const { user_id, role_ids } = req.body;
  
  if (!user_id || !role_ids || !Array.isArray(role_ids)) {
    return res.status(400).json({ message: 'user_id and role_ids array required' });
  }
  
  // First delete existing roles
  db.run('DELETE FROM user_roles WHERE user_id = ?', [user_id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    
    // Insert new roles
    const stmt = db.prepare('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)');
    role_ids.forEach(role_id => {
      stmt.run([user_id, role_id]);
    });
    stmt.finalize();
    
    res.json({ message: 'Roles assigned successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user || user.password_hash !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // payload
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  });
};
