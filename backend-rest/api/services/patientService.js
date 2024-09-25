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
        throw new CustomErrors.ConflictError('Patient already exists');
      };

      await newPatient.save();
      return newPatient.serialize();

    } catch (error) {
      switch (error.constructor.name) {
        case 'ValidationError':
        case 'ConflictError':
          throw error;
      }

      // 'Error creating patient'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
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
      // 'Error retriving patient list'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
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
      switch (error.constructor.name) {
        case 'ValidationError':
        case 'NotFoundError':
          throw error;
      }

      // 'Error retrieve patient'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
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
      switch (error.constructor.name) {
        case 'NotFoundError':
        case 'ValidationError':
          throw error;
      }

      // 'Error updating patient'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
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
      switch (error.constructor.name) {
        case 'NotFoundError':
          throw error;
      };

      // 'Error deleting patient'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
    }
  }
}

module.exports = PatientService;
