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
    static associate(models) {
      patients.hasMany(models.appointments, {
        foreignKey: 'patientId',
        as: 'appointments'
      });
    }

    serialize() {
      return {
        uuid: this.uuid,
        name: this.name,
        phone: this.phone,
        email: this.email,
        birthDate: this.birthDate,
        gender: this.gender,
        height: this.height,
        weight: this.weight,
      };
    }
  }
  patients.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isUUID: 4,
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 255],
          msg: 'O nome deve ter pelo menos 3 caracteres.'
        }
      }
    },
    phone: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O telefone é um campo obrigatório.'
        },
        isNumeric: {
          msg: 'O telefone deve conter apenas números.'
        },
        len: {
          args: [11, 15],
          msg: 'O telefone deve ter entre 11 e 15 dígitos.'
        }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email deve estar em um formato válido.'
        }
      }
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Data de nascimento deve ser uma data válida.'
        },
        isBefore: {
          args: new Date().toISOString().split('T')[0],
          msg: 'A data de nascimento deve ser anterior à data atual.'
        }
      }
    },
    /*
      TODO:
      The best approach here would be to create a gender table, but using an 
      enum at this moment reduces complexity and makes the intent explicit.
      Keeping it simple. KISS.
    */
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other', 'none', 'unspecified'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['male', 'female', 'other', 'none', 'unspecified']],
          msg: 'O gênero deve ser um dos seguintes: male, female, other, none, unspecified.'
        }
      }
    },
    height: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'A altura deve ser um valor decimal.'
        },
        min: {
          args: 0.01,
          msg: 'A altura deve ser maior que 0.01.'
        }
      }
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'O peso deve ser um valor decimal.'
        },
        min: {
          args: 0.01,
          msg: 'O peso deve ser maior que 0.01.'
        }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: 'patients',
    indexes: [
      {
        unique: true,
        fields: ['uuid']
      }
    ]
  });

  patients.addHook('beforeDestroy', async (patient, options) => {
    /*
      TODO:
      https://en.wikipedia.org/wiki/Crypto-shredding
      The current use of hashField is LGPD compliant and provides minimal anonymization, 
      satisfying the desired requirements. However, a more robust solution would involve 
      crypto-shredding for string fields and using approximate ranges for dates and numeric values.

      Crypto-shredding will address the issue of sensitive data in backup databases.
      Plan to study and implement this in the future for enhanced data protection.

      FINDED BUG, PIVOTES TO CRYPTO SHREDDING!
    */
    const hashField = (field) => {
      return crypto.createHash('sha256').update(field).digest('hex');
    };

    const decimalMinimun = '00.01';
    const dateOfBrazilianDiscovery = '1500-04-22';

    patient.name = hashField(patient.name);
    patient.email = hashField((patient.email + patient.id)); //FINDED BUG, PIVOTES TO CRYPTO SHREDDING!
    patient.phone = '000000000000000';
    patient.gender = 'unspecified';
    patient.birthDate = dateOfBrazilianDiscovery;
    patient.height = decimalMinimun;
    patient.weight = decimalMinimun;

    await patient.save({ transaction: options.transaction, validate: false });
  });

  return patients;
};
