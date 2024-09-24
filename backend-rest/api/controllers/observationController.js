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
}

module.exports = ObservationController;
