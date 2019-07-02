var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // this route should find all contacts in the table and display them as JSON
  app.get("/api/users", function (req, res) {
    db.User.findAll({
      // order by last name, then first name
    }).then(function (users) {
      res.json(users);
    })
  });

  app.get("/api/login", passport.authenticate("local"), function(req,res){
    res.json(req.user);
  });

  // this route should add a new contact to the table
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
      location,
      picture,
      donated,
      volunteered,
      bought,
      sold
    } = req.body;

    var newUser = {
      firstName,
      lastName,
      companyName,
      phoneNumber,
      emailAddress,
      location,
      picture,
      donated,
      volunteered,
      bought,
      sold
    };
    // here is where the computer sends the object to the model and the database
    db.User.create(newUser)
      .then(function (user) {
        console.log(`added contact ${user.emailAddress} ${user.password}`);
        res.redirect(307, "api/login");

      })
      .catch(function (err) {
        res.status(401).json(err);
      })
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  })

  app.get("/api/user_data", function(req, res){
    if(!req.user){
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      })
    }
  })


  // is it possible to string all of these routes together or is there a better way to accomplish being able to 
  // edit a piece of data through a api request
  // 

  app.put('/api/users/:id/:firstName?/:lastName?/:companyName?/:emailAddress?/:location?/:picture?/', function (req, res, next) {
    db.Contact.update({
        firstName: req.params.firstName
      }, {
        where: req.params.id
      })
      .then(function (rowsUpdated) {
        res.json(rowsUpdated)
      })
  })

}