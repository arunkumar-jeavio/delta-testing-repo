"use strict";
const crypto = require("node:crypto");
const settings = require("../../config/settings.json");
const { findByEmail, verify } = require("./users");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function login(email, password, opts) {
  if (!EMAIL_RE.test(String(email || ""))) return { ok: false, reason: "invalid-email" };
  if (String(password || "").length < settings.minPasswordLength) return { ok: false, reason: "password-too-short" };
  const user = findByEmail(email);
  if (!user || !verify(user, password)) return { ok: false, reason: "invalid-credentials" };
  const remember = Boolean(opts && opts.remember);
  return { ok: true, token: crypto.randomBytes(16).toString("hex"), expiresInMinutes: remember ? 20160 : settings.sessionMinutes, user: { name: user.name, role: user.role } };
}

module.exports = { login };
