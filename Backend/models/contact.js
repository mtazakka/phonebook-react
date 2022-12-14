'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Contact.belongsTo(models.User)
    }
  }
  Contact.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    address: DataTypes.STRING,
    // UserId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};