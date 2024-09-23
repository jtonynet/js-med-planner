const { StatusCodes } = require('http-status-codes');
const { appointments, patients, doctors, db } = require('../models');
const moment = require('moment-timezone');

class AppointmentController {
  static async create(req, res) {
    const { uuid: patientUUID } = req.params
    let { uuid, description, startTime, endTime } = req.body;

    try {
      const patient = await patients.findOne({
        where: {
          uuid: patientUUID,
        },
        attributes: ['id'],
      });

      const doctor = await doctors.findOne({
        where: {
          uuid: req.userUUID
        },
        attributes: ['id'],
      });

      const fields = { uuid, patientId: patient.id, doctorId: doctor.id, description, startTime, endTime };
      const newAppointment = appointments.build(fields);

      const conflicts = await AppointmentController.findConflicts(newAppointment);
      if (conflicts.length > 0) {
        // USE IT ON  on place of "America/Sao_Paulo"
        // const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const appoitementsConflicted = conflicts.map(conflict => ({
          uuid: conflict.uuid,
          startTime: moment.tz(conflict.startTime, "America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment.tz(conflict.endTime, "America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss')
        }));

        return res.status(StatusCodes.CONFLICT).json({
          message: `${conflicts.length} conflicting appointment(s) found`,
          appointments: appoitementsConflicted
        });
      };

      // TODO: validate

      await newAppointment.save();

      return res.status(StatusCodes.CREATED).json(
        AppointmentController.serializeModel(newAppointment)
      );

    } catch (error) {
      console.log(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating appointment'
      });
    }
  }

  static async retrieveListByPatientUUID(req, res) {
    const { uuid: patientUUIDdParam } = req.params

    const patient = await patients.findOne({
      where: {
        uuid: patientUUIDdParam,
      },
      attributes: ['id'],
    });

    const list = await appointments.findAll({
      where: {
        patientId: patient.id,
      },
      attributes: ['uuid', 'description', 'startTime', 'endTime'],
      order: [['createdAt', 'DESC']],
    });

    return res.status(StatusCodes.OK).json(list);
  }

  static async updateByUUID(req, res) {
    const { uuid: uuidParam } = req.params

    try {
      const appointment = await appointments.findOne({
        where: {
          uuid: uuidParam,
        },
        attributes: ['uuid', 'doctorId', 'description', 'startTime', 'endTime'],
      });

      const allowedFields = ['description', 'startTime', 'endTime'];
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          appointment[field] = req.body[field];
        }
      });

      const conflicts = await AppointmentController.findConflicts(appointment);
      if (conflicts.length > 0) {
        // USE IT ON  on place of "America/Sao_Paulo"
        // const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const appoitementsConflicted = conflicts.map(conflict => ({
          uuid: conflict.uuid,
          startTime: moment.tz(conflict.startTime, "America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment.tz(conflict.endTime, "America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss')
        }));

        return res.status(StatusCodes.CONFLICT).json({
          message: `${conflicts.length} conflicting appointment(s) found`,
          appointments: appoitementsConflicted
        });
      };

      // TODO: validate

      res.status(StatusCodes.OK).json(
        AppointmentController.serializeModel(appointment)
      );

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating appointment'
      });
    }
  }

  static async findConflicts(appointmentModel) {
    try {
      /*
        1. ExtractMethod to model / ServiceMethod / Repository candidate

        2. This query became awful and unnecessarily complex using 
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

      const conflicts = await appointments.sequelize.query(
        conflictsQuery,
        {
          replacements: {
            doctorId: appointmentModel.doctorId,
            startTime: appointmentModel.startTime,
            endTime: appointmentModel.endTime
          },
          type: appointments.sequelize.QueryTypes.SELECT
        }
      );

      return conflicts;
    } catch (error) {
      throw error;
    }
  }

  static serializeModel(appointmentModel) {
    return {
      uuid: appointmentModel.uuid,
      description: appointmentModel.description,
      startTime: moment.tz(appointmentModel.startTime, "America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment.tz(appointmentModel.endTime, "America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss'),
    };
  }
}

module.exports = AppointmentController;
