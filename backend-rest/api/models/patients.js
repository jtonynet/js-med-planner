'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class patients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  patients.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(25)
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other', 'none', 'unspecified'),
      allowNull: false
    },
    height: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'patients',
  });

  patients.addHook('beforeDestroy', async (patient, options) => {
    // hashField compliant with LGPD
    const hashField = (field) => {
      return crypto.createHash('sha256').update(field).digest('hex');
    };

    // TODO: move to constants values of patient. Anonymize purpouses
    const decimalMinimun = '00.01';
    const dateOfBrazilianDiscovery = '1500-04-22';

    patient.name = hashField(patient.name);
    patient.email = hashField(patient.email);
    patient.phone = null;
    patient.gender = 'unspecified';
    patient.birth_date = dateOfBrazilianDiscovery;
    patient.height = decimalMinimun;
    patient.weight = decimalMinimun;

    await patient.save({ transaction: options.transaction });
  });

  return patients;
};
