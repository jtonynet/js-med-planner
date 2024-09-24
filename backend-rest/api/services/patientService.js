const { Op } = require('sequelize');
const database = require('../models');
const CustomErrors = require('../errors/customErrors');

class PatientService {
  async create(dto) {
    try {
      const newPatient = database.patients.build(dto)

      // TODO: validate patient

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
      console.log(error);

      if (error instanceof CustomErrors.ConflictError) {
        throw error;
      }

      // 'Error creating patient'
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
      console.log(error);

      // 'Error retriving patient list'
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
    }

  }

  async retrieveByUUID(dto) {
    try {
      // TODO: validate dto.uuid

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
      console.log(error)

      if (error instanceof CustomErrors.NotFoundError) {
        throw error;
      }

      // 'Error retrieve patient'
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
    }
  }

  async updateByUUID(dto) {
    try {
      // TODO: validate dto.uuid

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

      // TODO: validate patient

      await patient.save();

      return patient.serialize();

    } catch (error) {
      console.log(error)

      if (error instanceof CustomErrors.NotFoundError) {
        throw error;
      }

      // 'Error updating patient'
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
    }
  }

  async deleteByUUID(dto) {
    try {
      // TODO: validate dto.uuid

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

      console.log(error)

      if (error instanceof CustomErrors.NotFoundError) {
        throw error;
      }

      // 'Error updating patient'
      throw new CustomErrors.InternalServerError('An unexpected error occurred');

      console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error deleting patient'
      });
    }
  }
}

module.exports = PatientService;
