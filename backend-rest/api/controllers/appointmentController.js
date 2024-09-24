const { StatusCodes } = require('http-status-codes');
const { appointments, patients, doctors, db } = require('../models');

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

      const conflicts = await AppointmentController._searchConflicts(newAppointment);
      if (conflicts.exists) {
        return res.status(StatusCodes.CONFLICT).json(conflicts.response);
      }

      // TODO: validate

      await newAppointment.save();

      return res.status(StatusCodes.CREATED).json(
        newAppointment.serialize()
      );

    } catch (error) {
      console.log(error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating appointment'
      });
    }
  }

  static async retrieveList(req, res) {
    try {
      const doctor = await doctors.findOne({
        where: {
          uuid: req.userUUID
        },
        attributes: ['id'],
      });

      const list = await appointments.findAll({
        where: {
          doctorId: doctor.id,
        },
        attributes: ['uuid', 'description', 'startTime', 'endTime'],
        order: [['createdAt', 'DESC']],
      });

      return res.status(StatusCodes.OK).json(list);

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error retriving appointment list'
      });
    }
  }

  static async retrieveListByPatientUUID(req, res) {
    const { uuid: patientUUIDdParam } = req.params

    try {
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

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error retriving appointment list'
      });
    }
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

      const conflicts = await AppointmentController._searchConflicts(appointment);
      if (conflicts.exists) {
        return res.status(StatusCodes.CONFLICT).json(conflicts.response);
      }

      // TODO: validate

      await appointment.save();

      res.status(StatusCodes.OK).json(
        appointment.serialize
      );

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating appointment'
      });
    }
  }

  static async deleteByUUID(req, res) {
    const { uuid: uuidParam } = req.params

    try {
      const appointment = await appointments.findOne({
        where: {
          uuid: uuidParam,
        },
      });

      if (!appointment) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'appointment not found',
        });
      }

      await appointment.destroy();

      res.status(StatusCodes.NO_CONTENT).end();

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting appointment'
      });
    }
  }

  static async _searchConflicts(appointment) {
    try {
      const conflicts = await appointment.findConflicts();
      if (conflicts.length > 0) {
        const appointmentsConflicted = conflicts.map(conflict => ({
          uuid: conflict.uuid,
          startTime: conflict.startTime,
          endTime: conflict.endTime
        }));

        return {
          exists: true,
          response: {
            message: `${conflicts.length} conflicting appointment(s) found`,
            appointments: appointmentsConflicted
          }
        };
      }
      return {
        exists: false,
        response: null
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AppointmentController;
