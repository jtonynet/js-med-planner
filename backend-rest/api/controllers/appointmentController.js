const { StatusCodes } = require('http-status-codes');
const { validate: validateUUID } = require('uuid');
const CustomErrors = require('../errors/customErrors');
const AppointmentService = require('../services/appointmentService');
const appointmentService = new AppointmentService();

const { appointments, patients, doctors, db } = require('../models');

class AppointmentController {

  static async create(req, res) {
    const { uuid: patientUUID } = req.params

    if (!validateUUID(patientUUID)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    try {
      const { uuid: appointmentUUID, description, startTime, endTime } = req.body;

      const dto = { userUUID: req.userUUID, patientUUID, appointmentUUID, description, startTime, endTime };

      const newAppointment = await appointmentService.create(dto);

      return res.status(StatusCodes.CREATED).json(newAppointment);

    } catch (error) {
      if (error instanceof CustomErrors.NotFoundError) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
        });
      }

      if (error instanceof CustomErrors.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
          errors: error.details
        });
      }

      if (error instanceof CustomErrors.ConflictError) {
        return res.status(StatusCodes.CONFLICT).json({
          message: error.message,
          errors: error.details
        });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });

    }
  }

  static async retrieveList(req, res) {
    try {
      const dto = { userUUID: req.userUUID };

      const list = await appointmentService.retrieveList(dto);

      res.status(StatusCodes.OK).json(list);

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }

  static async retrieveListByPatientUUID(req, res) {
    const { uuid: patientUUID } = req.params;

    if (!validateUUID(patientUUID)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    try {
      const userUUID = req.userUUID;

      const dto = { patientUUID, userUUID };

      const list = await appointmentService.retrieveListByPatientUUID(dto);

      res.status(StatusCodes.OK).json(list);

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

  static async updateByUUID(req, res) {
    const { uuid: appointmentUUID } = req.params

    if (!validateUUID(appointmentUUID)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    try {
      const allowedFields = ['description', 'startTime', 'endTime'];

      let dto = { uuid: appointmentUUID };
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          dto[field] = req.body[field];
        }
      });
      const appointment = await appointmentService.updateByUUID(dto);

      res.status(StatusCodes.OK).json(appointment);

    } catch (error) {
      if (error instanceof CustomErrors.NotFoundError) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: error.message
        });
      }

      if (error instanceof CustomErrors.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
          errors: error.details
        });
      }

      if (error instanceof CustomErrors.ConflictError) {
        return res.status(StatusCodes.CONFLICT).json({
          message: error.message,
          errors: error.details
        });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });
    }
  }

  static async deleteByUUID(req, res) {
    const { uuid: appointmentUUID } = req.params

    if (!validateUUID(appointmentUUID)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    try {
      let dto = { uuid: appointmentUUID };

      await appointmentService.deleteByUUID(dto);

      return res.status(StatusCodes.NO_CONTENT).end();

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

module.exports = AppointmentController;
