"use strict";
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { login } = require("./auth/login");

const UI = path.join(__dirname, "ui");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };

function readBody(req, cb) {
  var data = "";
  req.on("data", function (c) { data += c; });
  req.on("end", function () {
    try { cb(JSON.parse(data || "{}")); } catch (e) { cb({}); }
  });
}

function serveStatic(res, file) {
  var full = path.join(UI, file);
  fs.readFile(full, function (err, buf) {
    if (err) { res.writeHead(404); res.end("not found"); return; }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(full)] || "text/plain" });
    res.end(buf);
  });
}

function handle(req, res) {
  if (req.method === "GET" && req.url === "/") return serveStatic(res, "login.html");
  if (req.method === "GET" && (req.url === "/login.js" || req.url === "/login.css")) return serveStatic(res, req.url.slice(1));
  if (req.method === "POST" && req.url === "/api/login") {
    return readBody(req, function (b) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(login(b.email, b.password, { remember: b.remember })));
    });
  }
  res.writeHead(404);
  res.end("not found");
}

if (require.main === module) {
  http.createServer(handle).listen(3000, function () { console.log("login demo on http://localhost:3000"); });
}

module.exports = { handle };
