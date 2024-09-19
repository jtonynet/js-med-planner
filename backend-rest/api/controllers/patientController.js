const { StatusCodes } = require('http-status-codes');
const { patients } = require('../models');

class PatientController {
  static async create(req, res) {
    try {
      const {
        uuid, name, phone, email,
        birth_date, gender, height, weight
      } = req.body;

      const newPatient = await patients.create({
        uuid, name, phone, email,
        birth_date, gender, height, weight
      });

      res.status(StatusCodes.CREATED).json({
        uuid: newPatient.uuid,
        name: newPatient.name,
        phone: newPatient.phone,
        email: newPatient.email,
        birth_date: newPatient.birth_date,
        gender: newPatient.gender,
        height: newPatient.height,
        weight: newPatient.weight,
      });

    } catch (error) {
      // log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating patient' });
    }
  }

  static async retrieveList(req, res) {
    const patientsList = await patients.findAll({
      attributes: [
        'uuid', 'name', 'phone',
        'email', 'birth_date', 'gender',
        'height', 'weight'
      ],
      order: [['createdAt', 'DESC']],
    })

    res.status(StatusCodes.OK).json(patientsList);
  }

  static async retrieveByUUID(req, res) {
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

      const updatedFields = {};
      const allowedFields = ['name', 'phone', 'birth_date', 'gender', 'height', 'weight'];

      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          updatedFields[field] = req.body[field];
        }
      });

      await patient.update(updatedFields);

      res.status(StatusCodes.OK).json({
        uuid: patient.uuid,
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
        birth_date: patient.birth_date,
        gender: patient.gender,
        height: patient.height,
        weight: patient.weight,
      });

    } catch (error) {
      // TODO: log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating patient' });
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
      // TODO: log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting patient' });
    }
  }
}

module.exports = PatientController