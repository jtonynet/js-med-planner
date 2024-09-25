const { StatusCodes } = require('http-status-codes');
const { validate: validateUUID } = require('uuid');
const { appointments, observations } = require('../models');
const ObservationService = require('../services/observationService');
const observationService = new ObservationService();

class ObservationController {
  static async create(req, res) {
    const { uuid: appointmentUUID } = req.params;

    if (!validateUUID(appointmentUUID)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    try {
      const { uuid, message } = req.body;

      const dto = { uuid, message, appointmentUUID };

      const newObservation = await observationService.create(dto);

      return res.status(StatusCodes.CREATED).json(newObservation);

    } catch (error) {
      if (error instanceof CustomErrors.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
          errors: error.details
        });
      }

      if (error instanceof CustomErrors.ConflictError) {
        return res.status(StatusCodes.CONFLICT).json({ message: error.message });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }

  static async retrieveListByAppointmentUUID(req, res) {
    const { uuid: appointmentUUID } = req.params;

    if (!validateUUID(appointmentUUID)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    try {
      const dto = { uuid: appointmentUUID };

      const list = await observationService.retrieveListByAppointmentUUID(dto);

      return res.status(StatusCodes.OK).json(list);

    } catch (error) {
      if (error instanceof CustomErrors.NotFoundError) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
        });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }
}

module.exports = ObservationController;
