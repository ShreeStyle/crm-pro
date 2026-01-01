const { db } = require("../../config/db");
const bcrypt = require("bcrypt");
const { signToken } = require("../../config/jwt");

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email & password required" });

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    // ✅ Fetch roles from user_roles table
    db.all(
      `SELECT r.name FROM roles r
       JOIN user_roles ur ON ur.role_id = r.id
       WHERE ur.user_id = ?`,
      [user.id],
      (err, rolesRows) => {
        if (err) return res.status(500).json({ error: "DB error fetching roles" });

        const roles = rolesRows.map(r => r.name);

        // ✅ Fetch permissions via role_permissions
        db.all(
          `SELECT DISTINCT p.key FROM permissions p
           JOIN role_permissions rp ON rp.permission_id = p.id
           JOIN user_roles ur ON ur.role_id = rp.role_id
           WHERE ur.user_id = ?`,
          [user.id],
          (err, permRows) => {
            if (err) return res.status(500).json({ error: "DB error fetching permissions" });

            const permissions = permRows.map(p => p.key);

            // ✅ Sign JWT with real roles & permissions
            const token = signToken({ user_id: user.id, roles, permissions });

            res.json({ token });
          }
        );
      }
    );
  });
};

module.exports = { login };
