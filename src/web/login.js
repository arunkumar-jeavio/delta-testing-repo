"use strict";
(function () {
  var form = document.getElementById("login-form");

  function showError(message) {
    var el = document.getElementById("error-container");
    el.textContent = message; // plain text only
    el.hidden = false;
  }

  // ---- reason codes to text (kept apart from showError on purpose) ----

  function describe(reason, email, attemptsLeft) {
    if (reason === "invalid-email") return "Enter a valid email address.";
    if (reason === "password-too-short") return "Password is too short.";
    if (reason === "password-needs-digit") return "Password needs at least one digit.";
    if (reason === "password-too-long") return "Password is too long.";
    if (reason === "account-locked") return "Too many attempts. Try again later.";
    if (typeof attemptsLeft === "number") return "Wrong credentials for " + email + ". " + attemptsLeft + " attempt(s) left before lockout.";
    return "Wrong credentials for " + email;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password, remember: document.getElementById("remember").checked })
    })
      .then(function (r) { return r.json(); })
      .then(function (body) {
        if (body.ok) { window.location.href = "/welcome"; } else { showError(describe(body.reason, email, body.attemptsLeft)); }
      });
  });
})();
