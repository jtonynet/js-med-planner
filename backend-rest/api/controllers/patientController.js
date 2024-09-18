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
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating patient' });
    }
  }

  static async retrievePatientsList(req, res) {
    const patientsList = await patients.findAll({
      attributes: ['uuid', 'name', 'phone', 'email', 'birth_date', 'gender', 'height', 'weight'],
    })

    res.status(StatusCodes.OK).json(patientsList);
  }
}

module.exports = PatientController