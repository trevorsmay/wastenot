module.exports = function(sequelize, DataTypes) {
    var job = sequelize.define("job", {
        //food type, only letters. 
        foodType: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     is: ["^[a-z]+$", 'i']
            // }
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
        //    validate: {
        //        isDate: true 
        //    }
        },
    
        //pick up location
        pickupLocation: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
    
        //pick up time
        pickupTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        price: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        // status: {
        //     type:DataTypes.BOOLEAN,

        // }
    
      });
    
    
    //   User.prototype.validPassword = function(password) {
    //     return bcrypt.compareSync(password, this.password);
    //   };
    //   // Hooks are automatic methods that run during various phases of the User Model lifecycle
    //   // In this case, before a User is created, we will automatically hash their password
    //   User.addHook("beforeCreate", function(user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    //   });
      return (job);

}
