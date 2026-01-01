require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "crm_super_secret_123";

const signToken = (payload) => jwt.sign(payload, secret, { expiresIn: "8h" });
const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { signToken, verifyToken };
