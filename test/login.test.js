"use strict";
const test = require("node:test");
const assert = require("node:assert");
const { login } = require("../src/auth/login");

test("valid credentials sign in", () => {
  assert.strictEqual(login("demo@example.test", "Passw0rd-demo").ok, true);
});

test("a wrong password is rejected", () => {
  assert.strictEqual(login("demo@example.test", "Passw0rd-wrong").reason, "invalid-credentials");
});

test("a malformed email is rejected", () => {
  assert.strictEqual(login("not-an-email", "Passw0rd-demo").reason, "invalid-email");
});

test("a short password is rejected", () => {
  assert.strictEqual(login("demo@example.test", "short").reason, "password-too-short");
});
