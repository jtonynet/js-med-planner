'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  doctors.init({
    uuid: DataTypes.UUID,
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    /*
      TODO:
      The `password`field was applied solely to have minimal authentication 
      for the resource endpoints from the start. If I meet all the mandatory 
      requirements of the challenge and have available time, I plan to implement 
      a user with appropriate roles. 
    */
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'doctors',
  });
  return doctors;
};