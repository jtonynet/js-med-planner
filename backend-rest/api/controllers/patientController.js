const { StatusCodes } = require('http-status-codes');
const { patients } = require('../models');

class PatientController {
  static async createPatient(req, res) {
    try {
      const {
        uuid, name, phone, email,
        birth_date, gender, height, weight
      } = req.body;

      const newPatient = await patients.create({
        uuid, name, phone, email,
        birth_date, gender, height, weight
      });

      res.status(StatusCodes.CREATED).json(newPatient);

    } catch (error) {
      // log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating patient' });
    }
  }

  static async retrievePatientsList(req, res) {
    const patientsList = await patients.findAll({
      attributes: [
        'uuid', 'name', 'phone',
        'email', 'birth_date', 'gender',
        'height', 'weight'
      ],
    })

    res.status(StatusCodes.OK).json(patientsList);
  }

  static async retrievePatientByUUID(req, res) {
    const { uuid: uuidParam } = req.params

    try {
      const patient = await patients.findOne({
        where: {
          uuid: uuidParam,
        },
        attributes: [
          'uuid', 'name', 'phone',
          'email', 'birth_date', 'gender',
          'height', 'weight'
        ],
      })

      res.status(StatusCodes.OK).json(patient);
    } catch (error) {
      // log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieve patient' });
    }

  }
}

module.exports = PatientController