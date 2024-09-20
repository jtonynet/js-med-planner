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
        foreignKey: 'patient_id',
        as: 'patient',
      });

      appointments.belongsTo(models.doctors, {
        foreignKey: 'doctor_id',
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
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'id',
      }
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      allowNull: false,
      field: 'start_time'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_time'
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