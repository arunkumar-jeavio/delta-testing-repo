"use strict";
const MAX_ATTEMPTS = 5;
// failed attempts per email, held in memory
const attempts = new Map();

function recordFailure(email) { attempts.set(email, (attempts.get(email) || 0) + 1); }
function isLocked(email) { return (attempts.get(email) || 0) >= MAX_ATTEMPTS; }
function attemptsLeft(email) { return Math.max(0, MAX_ATTEMPTS - (attempts.get(email) || 0)); }
function reset(email) { attempts.delete(email); }

module.exports = { recordFailure, isLocked, attemptsLeft, reset, MAX_ATTEMPTS };
