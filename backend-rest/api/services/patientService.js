const { Op } = require('sequelize');
const database = require('../models');
const BaseService = require('./baseService');
const CustomErrors = require('../errors/customErrors');

class PatientService extends BaseService {
  async create(dto) {
    try {
      const newPatient = database.patients.build(dto)

      await this._validateModel(newPatient);

      const existingPatient = await database.patients.findOne({
        where: {
          [Op.or]: [
            { email: newPatient.email },
            { uuid: newPatient.uuid }
          ]
        }
      });

      if (existingPatient) {
        throw new CustomErrors.ValidationError('Patient already exists');
      }

      await newPatient.save();
      return newPatient.serialize();

    } catch (error) {
      this._errorHandler(error);
    }
  }

  async retrieveList() {
    try {
      const list = await database.patients.findAll({
        attributes: ['uuid', 'name', 'phone', 'email', 'birthDate', 'gender', 'height', 'weight'],
        order: [['createdAt', 'DESC']],
      });

      return list;

    } catch (error) {
      this._errorHandler(error)
    }
  }

  async retrieveByUUID(dto) {
    try {
      const patient = await database.patients.findOne({
        where: {
          uuid: dto.uuid,
        },
        attributes: ['uuid', 'name', 'phone', 'email', 'birthDate', 'gender', 'height', 'weight'],
      });

      if (!patient) {
        throw new CustomErrors.NotFoundError('Patient not found');
      }

      return patient.serialize();

    } catch (error) {
      this._errorHandler(error);
    }
  }

  async updateByUUID(dto) {
    try {
      let patient = await database.patients.findOne({
        where: {
          uuid: dto.uuid,
        },
      });

      if (!patient) {
        throw new CustomErrors.NotFoundError('Patient not found');
      }

      delete dto.uuid;
      patient.set(dto);

      await this._validateModel(patient);

      await patient.save();

      return patient.serialize();

    } catch (error) {
      this._errorHandler(error)
    }
  }

  async deleteByUUID(dto) {
    try {
      const patient = await database.patients.findOne({
        where: {
          uuid: dto.uuid,
        },
      });

      if (!patient) {
        throw new CustomErrors.NotFoundError('Patient not found');
      }

      return await patient.destroy();

    } catch (error) {
      this._errorHandler(error)
    }
  }
}

module.exports = PatientService;
