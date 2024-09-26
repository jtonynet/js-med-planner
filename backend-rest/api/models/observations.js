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

    serialize() {
      return {
        uuid: this.uuid,
        message: this.message
      };
    }
  }
  observations.init({
    uuid: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUUID: 4,
      }
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
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 1000],
          msg: 'Deve ter pelo menos 3 caracteres e no máximo 1000.'
        }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'observations',
  });
  return observations;
};