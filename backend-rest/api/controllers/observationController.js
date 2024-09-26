const { StatusCodes } = require('http-status-codes');
const { validate: validateUUID } = require('uuid');
const CustomErrors = require('../errors/customErrors');
const BaseController = require('./baseController');
const ObservationService = require('../services/observationService');
const observationService = new ObservationService();

class ObservationController extends BaseController {
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
      return BaseController._handleErrorResponse(res, error);
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
      return BaseController._handleErrorResponse(res, error);
    }
  }
}

module.exports = ObservationController;
