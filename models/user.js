module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("profile", {
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
      
      //address. string. length?
      address: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1,255]
          }
      },

      // phoneNumber (VARCHAR, NULL, length 10 characters, numbers only)
      phoneNumber: {
          type: DataTypes.STRING,
          validate: {
              len: [10,10],
              isNumeric: true
          }
      },
      
      //location. validation allows letters only. 
      location: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              is: ["^[a-z]+$", 'i']
          }
      },
      //times donated
      timesDonated: {
          type: DataTypes.INTEGER,
          allowNull: true,
            //somehow need to increment w/ donations
      },


      // emailAddress (VARCHAR, NULL, must be valid email format)
      emailAddress: {
          type: DataTypes.STRING,
          validate: {
              isEmail: true
          }
      },
      
      //user photo. URL only. Need to figure out how to use BLOB.
      photo: {
      type: DataTypes.BLOB,
      validate: {
          isUrl: true
      }
    },

    //money spent on food
    moneySpent: {
        type: DataTypes.STRING
    }

  });

  var Donate = sequelize.define("Donate", {
    //food type, only letters. 
    foodType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z]+$", 'i']
        }
    },

    //quantity of food to donate
    donateQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    //food expiration
    foodExpire: {
       type: DataTypes.STRING,
       deadline: DataTypes.DATE,
       validate: {
           isDate: true 
       }
    },

    //pick up location
    pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z]+$", 'i']
        }
    },

    //pick up time
    pickupTime: {
        type: DataTypes.STRING,
        allowNull: false,
    }

  });

  var Sell = sequelize.define("Sell", {
      //type of food
      foodType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: ["^[a-z]+$", 'i']
        }
    },

    //quantity
    foodQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    //food expiration
    foodExpire: {
        type: DataTypes.STRING,
        deadline: DataTypes.DATE,
        validate: {
            isDate: true 
        }
    },

    //time for pick up
    pickupTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    //cost for ugly produce.
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    }

  });
  return user;
};
