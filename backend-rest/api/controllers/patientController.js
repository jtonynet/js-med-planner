const { StatusCodes } = require('http-status-codes');
const { patients } = require('../models');

class PatientController {
  static async create(req, res) {
    try {
      const { uuid, name: patientName, phone, email, birthDate, gender, height, weight } = req.body;
      const patientData = { uuid, name: patientName, phone, email, birthDate, gender, height, weight };

      const newPatient = patients.build(patientData)

      // TODO: validate

      await newPatient.save();

      res.status(StatusCodes.CREATED).json(
        PatientController.sanitizePatientData(newPatient)
      );

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error creating patient'
      });
    }
  }

  static async retrieveList(req, res) {
    const list = await patients.findAll({
      attributes: ['uuid', 'name', 'phone', 'email', 'birthDate', 'gender', 'height', 'weight'],
      order: [['createdAt', 'DESC']],
    })

    res.status(StatusCodes.OK).json(list);
  }

  static async retrieveByUUID(req, res) {
    const { uuid: uuidParam } = req.params

    try {
      const patient = await patients.findOne({
        where: {
          uuid: uuidParam,
        },
        attributes: ['uuid', 'name', 'phone', 'email', 'birthDate', 'gender', 'height', 'weight'],
      })

      res.status(StatusCodes.OK).json(patient);
    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error retrieve patient'
      });
    }

  }

  static async updateByUUID(req, res) {
    const { uuid: uuidParam } = req.params

    try {
      const patient = await patients.findOne({
        where: {
          uuid: uuidParam,
        },
      });

      if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Patient not found',
        });
      }

      const allowedFields = ['name', 'phone', 'birthDate', 'gender', 'height', 'weight'];
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          patient[field] = req.body[field];
        }
      });

      // TODO: validate

      await patient.save();

      res.status(StatusCodes.OK).json(
        PatientController.sanitizePatientData(patient)
      );

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating patient'
      });
    }
  }

  static async deleteByUUID(req, res) {
    const { uuid: uuidParam } = req.params

    try {
      const patient = await patients.findOne({
        where: {
          uuid: uuidParam,
        },
      });

      if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Patient not found',
        });
      }

      await patient.destroy();

      res.status(StatusCodes.NO_CONTENT).end();

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting patient'
      });
    }
  }

  static sanitizePatientData(patient) {
    return {
      uuid: patient.uuid,
      name: patient.name,
      phone: patient.phone,
      email: patient.email,
      birthDate: patient.birthDate,
      gender: patient.gender,
      height: patient.height,
      weight: patient.weight,
    };
  }
}

module.exports = PatientController;
