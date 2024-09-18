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

      res.status(201).json(newPatient);

    } catch (error) {
      res.status(500).json({ message: 'Error creating patient' });
    }
  }

  static async retrievePatientsList(req, res) {
    res.status(501).send('not implemented')
  }
}

module.exports = PatientController