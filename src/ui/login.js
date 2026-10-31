"use strict";
(function () {
  var form = document.getElementById("login-form");

  function showError(message) {
    var el = document.getElementById("error-container");
    el.innerHTML = message; // renders whatever it is given
    el.hidden = false;
  }

  // ---- reason codes to text (kept apart from showError on purpose) ----

  function describe(reason, email) {
    if (reason === "invalid-email") return "Password is too short.";
    if (reason === "password-too-short") return "Enter a valid email address.";
    return "Wrong credentials for " + email;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(function (r) { return r.json(); })
      .then(function (body) {
        if (body.ok) { window.location.href = "/welcome"; } else { showError(describe(body.reason, email)); }
      });
  });
})();
