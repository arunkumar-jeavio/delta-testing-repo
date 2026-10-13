"use strict";
const { newGuestSession } = require("./session");
const { GUEST_LIMITS } = require("./policy");

function startGuest() {
  return { ok: true, session: newGuestSession(), limits: GUEST_LIMITS };
}

module.exports = { startGuest };
