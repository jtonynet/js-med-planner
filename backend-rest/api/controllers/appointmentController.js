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

      // EXTRACT METHOD -----------
      /*
        TODO:
        > 1. Requisitos funcionais:
        >    - Requisitos desejáveis:
        >      Eu como médico, quero que o sistema valide a minha agenda, 
        >      não deixando eu cadastrar mais de um paciente na mesma hora.

        1. ExtractMethod to model / ServiceMethod / Repository candidate

        2. This query became awful and unnecessarily complex using 
        the ORM features, so I decided to keep it raw in the code.
      */
      const appointmentConflictsQuery = `
        SELECT uuid, "startTime", "endTime" 
        FROM appointments 
        WHERE "doctorId" = :doctorId
          AND(
            ("startTime" BETWEEN :startTime AND :endTime)
            OR("endTime" BETWEEN :startTime AND :endTime)
            OR("startTime" < :startTime AND "endTime" > :endTime)
        );
       `;

      const appointmentConflicts = await appointments.sequelize.query(
        appointmentConflictsQuery,
        {
          replacements: { doctorId: doctor.id, startTime, endTime },
          type: appointments.sequelize.QueryTypes.SELECT
        }
      );

      if (appointmentConflicts.length > 0) {
        // USE IT ON  on place of "America/Sao_Paulo"
        // const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const conflicts = appointmentConflicts.map(conflict => ({
          uuid: conflict.uuid,
          startTime: moment.tz(conflict.startTime, "America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment.tz(conflict.endTime, "America/Sao_Paulo").format('YYYY-MM-DD HH:mm:ss')
        }));

        return res.status(StatusCodes.CONFLICT).json({
          message: `${conflicts.length} conflicting appointment(s) found`,
          appointments: conflicts
        });
      };
      // END OF EXTRACT METHOD ----------

      const newAppointment = appointments.build(fields)

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
        id: patient.id,
      },
      attributes: ['uuid', 'description', 'startTime', 'endTime'],
      order: [['createdAt', 'DESC']],
    });

    return res.status(StatusCodes.OK).json(list);
  }

  static serializeModel(item) {
    return {
      uuid: item.uuid,
      description: item.description,
      startTime: item.startTime,
      endTime: item.endTime
    };
  }
}

module.exports = AppointmentController;
