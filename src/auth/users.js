"use strict";
// Stub user store for the delta-testing mock. NOT a real credential store: fake demo accounts only.
const crypto = require("node:crypto");

const SALT = "delta-testing-demo-salt";
const hash = (password) => crypto.createHash("sha256").update(SALT + password).digest("hex");

const USERS = [
  { email: "demo@example.test", passwordHash: hash("Passw0rd-demo"), name: "Demo User", role: "user" },
  { email: "admin@example.test", passwordHash: hash("Adm1n-demo-pass"), name: "Demo Admin", role: "admin" },
];

function findByEmail(email) {
  return USERS.find((u) => u.email === String(email).toLowerCase()) || null;
}

function verify(user, password) {
  return user.passwordHash === hash(password);
}

module.exports = { findByEmail, verify };
