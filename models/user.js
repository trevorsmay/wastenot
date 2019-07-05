var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
        // firstName (VARCHAR, NOT NULL, between 1-30 characters)
        firstName: { 
          type: DataTypes.STRING, 
          allowNull: false,
          validate: {
              len: [1,30]
          }
      },
      // lastName (VARCHAR, NOT NULL, between 1-30 characters)
      lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1,30]
          }
      },

      //name of company. field can be blank.
      companyName: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
              len: [1,35]
          }
      },
      
      // phoneNumber (VARCHAR, NULL, length 10 characters, numbers only)
        phoneNumber: {
            type: DataTypes.STRING,
            validate: {
            len: [10,11],
            isNumeric: true
                }
            },


    // emailAddress (VARCHAR, NULL, must be valid email format)
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
            isEmail: true
                }
            },

    // The password cannot be null
        password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      //location. validation allows letters only. 
      location: {
          type: DataTypes.STRING,
          allowNull: false,
        //   validate: {
        //       is: ["^[a-z]+$", 'i'],
        //       len: [1,255]
        //   }
      },

            //user photo. URL only. Need to figure out how to use BLOB.
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            // isUrl: true
            // }
        },

      //times donated
      timesDonated: {
          type: DataTypes.INTEGER,
          allowNull: true,
            //somehow need to increment w/ donations
      },

      timesVolunteered: {
          type: DataTypes.INTEGER,
      },

      moneyEarned: {
        type: DataTypes.INTEGER
      },

    //money spent on food
    itemsSold: {
        type: DataTypes.INTEGER
    },
  });

  


  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return (User);
  
  //return User;
};

