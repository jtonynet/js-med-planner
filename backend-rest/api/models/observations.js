'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class observations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      observations.belongsTo(models.appointments, {
        foreignKey: 'appointmentId',
        as: 'appointment',
      });

    }
  }
  observations.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'appointmentId',
      references: {
        model: 'appointments',
        key: 'id',
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'observations',
  });
  return observations;
};