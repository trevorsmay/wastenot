module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("profile", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
