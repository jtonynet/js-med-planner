const { StatusCodes } = require('http-status-codes');
const { appointments, patients, doctors } = require('../models');

class AppointmentController {
  static async create(req, res) {
    const { uuid: patientUUID } = req.params

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

      const { uuid, description, startTime, endTime } = req.body;
      const fields = { uuid, patientId: patient.id, doctorId: doctor.id, description, startTime, endTime };

      const newAppointment = appointments.build(fields)

      // TODO: validate

      await newAppointment.save();

      res.status(StatusCodes.CREATED).json(
        AppointmentController.serializeModel(newAppointment)
      );

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating patient'
      });
    }
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
