const { StatusCodes } = require('http-status-codes');
const { validate: validateUUID } = require('uuid');
const CustomErrors = require('../errors/customErrors');
const PatientService = require('../services/patientService');
const patientService = new PatientService();

class PatientController {
  static async create(req, res) {
    const { uuid, name: patientName, phone, email, birthDate, gender, height, weight } = req.body;
    const dto = { uuid, name: patientName, phone, email, birthDate, gender, height, weight };

    try {
      const newPatient = await patientService.create(dto);
      return res.status(StatusCodes.CREATED).json(newPatient);

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

  static async retrieveList(req, res) {
    try {
      const list = await patientService.retrieveList();

      res.status(StatusCodes.OK).json(list);

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });

    }
  }

  static async retrieveByUUID(req, res) {
    const { uuid: uuidParam } = req.params;

    if (!validateUUID(uuidParam)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    const dto = { uuid: uuidParam };

    try {
      const patient = await patientService.retrieveByUUID(dto);

      res.status(StatusCodes.OK).json(patient);

    } catch (error) {
      if (error instanceof CustomErrors.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
          errors: error.details
        });
      }

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
    const { uuid: uuidParam } = req.params;

    if (!validateUUID(uuidParam)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    const allowedFields = ['name', 'phone', 'birthDate', 'gender', 'height', 'weight'];

    let dto = { uuid: uuidParam };
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        dto[field] = req.body[field];
      }
    });

    try {
      const patient = await patientService.updateByUUID(dto);

      res.status(StatusCodes.OK).json(patient);

    } catch (error) {
      if (error instanceof CustomErrors.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
          errors: error.details
        });
      }

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

  static async deleteByUUID(req, res) {
    const { uuid: uuidParam } = req.params;

    if (!validateUUID(uuidParam)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Request error invalid uuid'
      });
    }

    const dto = { uuid: uuidParam };

    try {
      await patientService.deleteByUUID(dto);

      return res.status(StatusCodes.NO_CONTENT).end();

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

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message
      });

    }
  }
}

module.exports = PatientController;
