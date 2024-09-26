const { Op } = require('sequelize');
const database = require('../models');
const BaseService = require('./baseService');
const CustomErrors = require('../errors/customErrors');

class ObservationService extends BaseService {
  async create(dto) {
    try {
      const appointment = await database.appointments.findOne({
        where: {
          uuid: dto.appointmentUUID,
        },
        attributes: ['id'],
      });

      if (!appointment) {
        throw new CustomErrors.NotFoundError('Appointment not found');
      };

      const newObservation = database.observations.build({
        uuid: dto.uuid,
        appointmentId: appointment.id,
        message: dto.message
      });

      await this._validateModel(newObservation);

      const existingObservation = await database.observations.findOne({
        where: {
          uuid: newObservation.uuid
        }
      });

      if (existingObservation) {
        throw new CustomErrors.ValidationError('Observation already exists');
      };

      await newObservation.save();

      return newObservation.serialize();

    } catch (error) {
      switch (error.constructor.name) {
        case 'NotFoundError':
        case 'ValidationError':
          throw error;
      }

      // 'Error creating appointment'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
    }
  }

  async retrieveListByAppointmentUUID(dto) {
    try {
      const appointment = await database.appointments.findOne({
        where: {
          uuid: dto.appointmentUUID,
        },
        attributes: ['id'],
      });

      if (!appointment) {
        throw new CustomErrors.NotFoundError('Appointment not found');
      };

      const list = await database.observations.findAll({
        where: {
          appointmentId: appointment.id
        },
        attributes: ['uuid', 'message'],
      })

      return list;

    } catch (error) {
      switch (error.constructor.name) {
        case 'NotFoundError':
          throw error;
      }

      // 'Error creating appointment'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
    }
  }
}

module.exports = ObservationService
