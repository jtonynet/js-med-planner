const { Op } = require('sequelize');
const database = require('../models');
const CustomErrors = require('../errors/customErrors');

class PatientService {
  async create(dto) {
    try {
      const newPatient = database.patients.build(dto)

      await this._validatePatient(newPatient);

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

      await this._validatePatient(patient);

      await patient.save();

      return patient.serialize();

    } catch (error) {
      switch (error.constructor.name) {
        case 'ValidationError':
        case 'NotFoundError':
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
        case 'ValidationError':
        case 'NotFoundError':
          throw error;
      };

      // 'Error deleting patient'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
    }
  }

  async _validatePatient(patient) {
    try {
      await patient.validate();
    } catch (validationError) {
      const errorDetails = validationError.errors.map(err => ({
        field: err.path,
        message: err.message
      }));

      throw new CustomErrors.ValidationError('Validation error(s) on request encountered', errorDetails);
    }
  }
}

module.exports = PatientService;
