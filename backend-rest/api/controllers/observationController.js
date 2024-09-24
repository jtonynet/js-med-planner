const { StatusCodes } = require('http-status-codes');
const { appointments, observations } = require('../models');

class ObservationController {
  static async create(req, res) {
    try {
      const { uuid: appointmentUUID } = req.params

      const appointment = await appointments.findOne({
        where: {
          uuid: appointmentUUID,
        },
        attributes: ['id'],
      });

      const { uuid, message } = req.body;
      const observationData = { uuid, message, appointmentId: appointment.id };

      const newObservation = observations.build(observationData);

      // TODO: validate

      await newObservation.save();

      res.status(StatusCodes.CREATED).json(
        newObservation.serialize()
      );

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating observation'
      });
    }
  }

  static async retrieveByAppointmentUUID(req, res) {
    const { uuid: appointmentUUID } = req.params

    try {
      const appointment = await appointments.findOne({
        where: {
          uuid: appointmentUUID,
        },
        attributes: ['id'],
      });

      const list = await observations.findAll({
        where: {
          appointmentId: appointment.id
        },
        attributes: ['uuid', 'message'],
      })

      return res.status(StatusCodes.OK).json(list);

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error retriving observation list'
      });
    }
  }
}

module.exports = ObservationController;
