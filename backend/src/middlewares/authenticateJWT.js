const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // JWT is sent as: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY"); // same key used in signToken
    req.user = decoded; // attach user info (id, roles, permissions) to request
    next(); // allow the request to continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateJWT;
