const { Op } = require('sequelize');
const database = require('../models');
const BaseService = require('./baseService');
const CustomErrors = require('../errors/customErrors');

class AppointmentService extends BaseService {
  async create(dto) {
    try {
      const patient = await database.patients.findOne({
        where: {
          uuid: dto.patientUUID,
        },
        attributes: ['id'],
      });

      if (!patient) {
        throw new CustomErrors.NotFoundError('Patient not found');
      };

      const doctor = await database.doctors.findOne({
        where: {
          uuid: dto.userUUID
        },
        attributes: ['id'],
      });

      const newAppointment = database.appointments.build({
        uuid: dto.appointmentUUID,
        patientId: patient.id,
        doctorId: doctor.id,
        description: dto.description,
        startTime: dto.startTime,
        endTime: dto.endTime
      });

      await this._validateModel(newAppointment);

      const existingAppointment = await database.appointments.findOne({
        where: {
          uuid: newAppointment.uuid
        }
      });

      if (existingAppointment) {
        throw new CustomErrors.ConflictError('Appointment already exists');
      };

      await this._searchConflicts(newAppointment);

      await newAppointment.save();

      return newAppointment.serialize();

    } catch (error) {
      switch (error.constructor.name) {
        case 'NotFoundError':
        case 'ValidationError':
        case 'ConflictError':
          throw error;
      }

      // 'Error creating appointment'
      console.log(error);
      throw new CustomErrors.InternalServerError('An unexpected error occurred');
    }
  }

  async _searchConflicts(appointment) {
    try {
      const conflicts = await appointment.findConflicts();
      if (conflicts.length > 0) {
        const appointmentsConflicted = conflicts.map(conflict => ({
          uuid: conflict.uuid,
          startTime: conflict.startTime,
          endTime: conflict.endTime
        }));

        throw new CustomErrors.ConflictError(
          'Appointment(s) conflicting found',
          appointmentsConflicted
        );
      }

    } catch (error) {
      throw error;
    }
  }
}

module.exports = AppointmentService;
