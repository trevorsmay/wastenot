var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  // this route will grab all of the user data and return to the user a json 
  // of all of the users in the database
  app.get("/api/getAllUsers", function (req, res) {
    console.log("working");
    console.log(db.User)
    db.User.findAll({}).then(function (users) {
      console.log("testing");
      console.log(users);
      res.json(users);
    })
  });

  // this call will retreive all of the available jobs in the database and return a json object to the user
  app.get("/api/getAllJobs", function (req, res) {
    console.log("working");
    db.job.findAll({}).then(function (jobs) {
      console.log("testing");
      console.log(jobs);
      res.json(jobs);
    })
  });

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
    app.delete("/api/examples/:id", function(req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
        res.json(dbExample);
      });
    });
  };

  app.post("/api/register", function(req, res){
      console.log("Hello");
      db.User.create(req.body).then(function(User){
          res.json(User);
      })
  })

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      })
    }
  })

  app.get("/api/getJobsWhere", function(req,res){
      db.job.findAll(
          {where:{status: false}},
      ).then(function(result){
        res.json(result)
      })
  })


  // this update will logout the user by updating a status element in the database.
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  })


// this is a call to update the job posting
// you must pass in the whole job object because it rewrites the row everytime
// below you will see my attempt at making it so only one element changes but it was giving me more trouble 
// than I bargained for. 
// you must pass in the id of the job that you wish to change which will be represented by a number.
  app.put("/api/updateJob/:id", function (req, res) {
  
    db.job.update(
      {updatedJob},
      {where:{id: req.params.id}}
      )
      .then(function(updated_job){
        res.json(updated_job)
      })
      .catch(function(error){
        console.log("error: " + error);
      })

  })

  // this is the call to update the user information form
  // it is not currently working because the computer is failing to recognize the 'User' argument in line 226
  // this like the job will change the whole row inside of SQL so make sure to populate the whole object before sending
  app.put("/api/updateUserInfo/:id/", function (req, res) {
    var {
      firstName,
      lastName,
      companyName,
      phoneNumber,
      email,
      password,
      location,
      photo,
      timesDonated,
      timesVolunteered,
      moneyEarned,
      itemsSold
    } = req.body;

    var newUserData = {
      firstName,
      lastName,
      companyName,
      phoneNumber,
      email,
      password,
      location,
      photo,
      timesDonated,
      timesVolunteered,
      moneyEarned,
      itemsSold
    }
    console.log(newUserData);
    db.User.update(newUserData).then(function (user) {
      console.log("hit the update logic")
      res.json(user)
    }).catch(function (err) {
      console.log(err);
      res.status(401).json(err);
    })
  })


  // this will permenantly delete a Job from the data base
  // Figure we would do this call instead of updateing the active status if someone were
  // to cancel their order all together
  // this will not reorder the Id numbers
  app.delete("/api/deleteJob/:id", (req, res) =>
      db.job.destroy({
        where: {
         id: req.params.id
        }
      }).then( (result) => res.json(result))
      )

  // Delete a user from the database 
  // warning this is permenant
  // Used when someone wants to delete their account
  app.delete( "/api/deleteUser/:id", (req, res) =>
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );

};