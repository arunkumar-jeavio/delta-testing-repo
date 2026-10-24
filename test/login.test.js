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

test("a failed sign-in reports how many attempts remain", () => {
  const r = login("demo@example.test", "Passw0rd-wrong2");
  assert.strictEqual(r.reason, "invalid-credentials");
  assert.strictEqual(typeof r.attemptsLeft, "number");
});

test("a password longer than 72 characters is rejected", () => {
  assert.strictEqual(login("demo@example.test", "a1" + "x".repeat(71)).reason, "password-too-long");
});

test("a locked account reports zero attempts left", () => {
  for (let i = 0; i < 6; i++) login("locked@example.test", "Passw0rd-wrong3");
  assert.strictEqual(login("locked@example.test", "Passw0rd-wrong3").attemptsLeft, 0);
});
