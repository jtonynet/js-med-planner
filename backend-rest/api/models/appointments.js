'use strict';
const { Model } = require('sequelize');
const moment = require('moment-timezone');

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

      appointments.hasMany(models.observations, {
        foreignKey: 'appointmentId',
        as: 'observations'
      });
    }

    async findConflicts() {
      try {
        /*
          This query became awful and unnecessarily complex using 
          the ORM features, so I decided to keep it raw in the code.
        */
        let dontCheckItself = "";
        if (this.id) {
          dontCheckItself = `AND id != :id`;
        }

        const conflictsQuery = `
          SELECT uuid, "startTime", "endTime" 
          FROM appointments 
          WHERE "doctorId" = :doctorId ${dontCheckItself}
            AND(
              ("startTime" BETWEEN :startTime AND :endTime)
              OR("endTime" BETWEEN :startTime AND :endTime)
              OR("startTime" < :startTime AND "endTime" > :endTime)
          );
         `;

        const conflicts = await sequelize.query(
          conflictsQuery,
          {
            replacements: {
              id: this.id,
              doctorId: this.doctorId,
              startTime: this.startTime,
              endTime: this.endTime
            },
            type: this.sequelize.QueryTypes.SELECT
          }
        );

        return conflicts;

      } catch (error) {
        throw error;
      }
    }

    serialize() {
      return {
        uuid: this.uuid,
        description: this.description,
        startTime: this.startTime,
        endTime: this.endTime
      };
    }
  }

  appointments.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isUUID: 4,
      }
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
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 255],
          msg: 'Deve ter pelo menos 3 caracteres e no máximo 255.'
        }
      }
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Deve ser uma data válida no formato YYYY-MM-DD HH:mm:ss'
        },
        notEmpty: {
          msg: 'Não pode ser vazia.'
        },
      },
      get() {
        const rawValue = this.getDataValue('startTime');
        return moment.tz(
          rawValue,
          Intl.DateTimeFormat().resolvedOptions().timeZone
        ).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Deve ser uma data válida no formato YYYY-MM-DD HH:mm:ss'
        },
        notEmpty: {
          msg: 'Não pode ser vazia.'
        },
        isAfterStartTime(value) {
          if (value && this.startTime && new Date(value) <= new Date(this.startTime)) {
            throw new Error('Data de término deve ser posterior à data de início.');
          }
        }
      },
      get() {
        const rawValue = this.getDataValue('endTime');
        return moment.tz(
          rawValue,
          Intl.DateTimeFormat().resolvedOptions().timeZone
        ).format('YYYY-MM-DD HH:mm:ss');
      }
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
    ],
    validate: {
      startTimeBeforeEndTime() {
        if (this.startTime && this.endTime && new Date(this.startTime) >= new Date(this.endTime)) {
          throw new Error('Data de início deve ser menor que a data de término.');
        }
      }
    }
  });
  return appointments;
};
