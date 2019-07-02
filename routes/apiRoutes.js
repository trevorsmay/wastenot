var db = require("../models");
// var passport = require("../config/passport");

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

  // This post route gives the front end the capability to add users to the database
  app.post("/api/signup", function (req, res) {
    // This will store a large set of data that is being passed from the front end
    // through the req.body
    // the logic below is emplementing an es6 shortcut called object deconstruction
    // 
    var {
      firstName,
      lastName,
      companyName,
      phoneNumber,
      emailAddress,
      password,
      location,
      photo,
      timesDonated,
      timesVolunteered,
      moneyEarned,
      itemsSold
    } = req.body;

    var newUser = {
      firstName,
      lastName,
      companyName,
      phoneNumber,
      emailAddress,
      password,
      location,
      photo,
      timesDonated,
      timesVolunteered,
      moneyEarned,
      itemsSold
    };
    // here is where the computer sends the object to the model and the database
    console.log(newUser)
    db.User.create(newUser).then(function (user) {
        console.log('testing');
        console.log(user);
        // res.redirect(307, "api/login");
        res.json(user);
      })
      .catch(function (err) {
        console.log('error:', err)
        res.status(401).json(err);
      })
  });

  // this will add jobs to the jobs database.
  app.post("/api/addJob", function (req, res) {
    var {
      foodType,
      donateQuantity,
      foodExpire,
      pickupLocation,
      pickupTime,
      price
    } = req.body;
    var newJob = {
      foodType,
      donateQuantity,
      foodExpire,
      pickupLocation,
      pickupTime,
      price
    }

    console.log(newJob);
    db.job.create(newJob).then(function (job) {
        console.log('Testing---------------------------------');
        console.log(job);
        // res.redirect(307, "api/login");
        res.json(job);
      })
      .catch(function (err) {
        console.log('error------------------------------------------:', err)
        res.status(401).json(err);
      })

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
    var {
      foodType,
      donateQuantity,
      foodExpire,
      pickupLocation,
      pickupTime,
      price
    } = req.body;
    var updatedJob = {
      foodType,
      donateQuantity,
      foodExpire,
      pickupLocation,
      pickupTime,
      price
    }

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

      // the code commented out below was my work towards trying to make 
      // it so the user could just input one change as apposed to changing the whole 
      // row every time......
      // |  |  | 
      // V  V  V
      
    // for (var key in updatedJob) {
    //   console.log(updatedJob.hasOwnProperty(key));
    //   if (updatedJob.hasOwnProperty(key)) {
        
    //     db.job.update({
    //       foodType: updatedJob.key
    //     }, {
    //       where: {
    //         id: req.params.id
    //       }
    //     }).then(function (job) {
    //       console.log("I am not the catch");
    //       res.json(job)
    //     }).catch(function (err) {
    //       console.log("I am the catch")
    //       console.log(err);

    //     })
    //   }
    // }
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
      emailAddress,
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
      emailAddress,
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



}