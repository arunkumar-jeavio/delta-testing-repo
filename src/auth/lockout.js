"use strict";
const MAX_ATTEMPTS = 5;
const attempts = new Map();

function recordFailure(email) { attempts.set(email, (attempts.get(email) || 0) + 1); }
function isLocked(email) { return (attempts.get(email) || 0) >= MAX_ATTEMPTS; }
function reset(email) { attempts.delete(email); }

module.exports = { recordFailure, isLocked, reset, MAX_ATTEMPTS };
