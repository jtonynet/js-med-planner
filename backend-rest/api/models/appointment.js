'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      appointments.belongsTo(models.patients, {
        foreignKey: 'patientId',
        as: 'patient',
      });

      appointments.belongsTo(models.doctors, {
        foreignKey: 'doctorId',
        as: 'doctor',
      });
    }
  }
  appointments.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'patientId',
      references: {
        model: 'patients',
        key: 'id',
      }
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'doctorId',
      references: {
        model: 'doctors',
        key: 'id',
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'appointments',
    indexes: [
      {
        unique: true,
        fields: ['uuid']
      }
    ]
  });
  return appointments;
};