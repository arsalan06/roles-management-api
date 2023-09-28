"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(Role, { through: "userRole", foreignKey: "userId" });
      User.belongsTo(SuperAdmins, { foreignKey: "createdBy" });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "email address already in use!",
        },
      },
      createdBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
