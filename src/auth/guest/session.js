"use strict";
const crypto = require("node:crypto");

function newGuestSession() {
  return { id: "guest-" + crypto.randomBytes(6).toString("hex"), role: "guest" };
}

module.exports = { newGuestSession };
