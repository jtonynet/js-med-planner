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
    }

    async findConflicts() {
      try {
        /*
          This query became awful and unnecessarily complex using 
          the ORM features, so I decided to keep it raw in the code.
        */
        const conflictsQuery = `
          SELECT uuid, "startTime", "endTime" 
          FROM appointments 
          WHERE "doctorId" = :doctorId
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
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('startTime');

        //timezone "America/Sao_Paulo"
        return moment.tz(
          rawValue,
          Intl.DateTimeFormat().resolvedOptions().timeZone
        ).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('endTime');

        //timezone "America/Sao_Paulo"
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
    ]
  });
  return appointments;
};