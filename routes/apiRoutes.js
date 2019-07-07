/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/findjobs", function(req, res) {
    db.job.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/donate", function(req, res) {
    console.log(req.body);
    db.job.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/complete/:id", function(req, res) {
    db.job.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/select/:id", function(req, res) {
    console.log(req.body.true);
    db.job.update(
      {status: req.body.true},
      {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/getJobsWhere", function(req,res){
      db.job.findAll(
        {where:{status: true}},
      ).then(function(result){
        res.json(result)
      })
  });

  app.get("/api/findJobsWhere", function(req,res){
    db.job.findAll(
      {where:{status: false}},
    ).then(function(result){
      res.json(result)
    })
});
};


