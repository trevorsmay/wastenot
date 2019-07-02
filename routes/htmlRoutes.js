/* eslint-disable no-unused-vars */
var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/movement", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/movement.html"));
  });

  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/registration.html"));
  });

  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });

  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
