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
        throw new CustomErrors.ValidationError('Appointment already exists');
      };

      await this._searchConflicts(newAppointment);

      await newAppointment.save();

      return newAppointment.serialize();

    } catch (error) {
      this._errorHandler(error);
    }
  }

  async retrieveList(dto) {
    try {
      const doctor = await database.doctors.findOne({
        where: {
          uuid: dto.userUUID
        },
        attributes: ['id'],
      });

      const list = await database.appointments.findAll({
        where: {
          doctorId: doctor.id,
        },
        attributes: ['uuid', 'description', 'startTime', 'endTime'],
        order: [['createdAt', 'DESC']],
      });

      return list;

    } catch (error) {
      this._errorHandler(error);
    }
  }

  async retrieveListByPatientUUID(dto) {
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

      const list = await database.appointments.findAll({
        where: {
          patientId: patient.id,
        },
        attributes: ['uuid', 'description', 'startTime', 'endTime'],
        order: [['createdAt', 'DESC']],
      });

      return list;

    } catch (error) {
      this._errorHandler(error);
    }
  }

  async updateByUUID(dto) {
    try {
      const appointment = await database.appointments.findOne({
        where: {
          uuid: dto.uuid,
        },
        attributes: ['id', 'uuid', 'patientId', 'doctorId', 'description', 'startTime', 'endTime'],
      });

      if (!appointment) {
        throw new CustomErrors.NotFoundError('Appointment not found');
      }

      delete dto.uuid;
      appointment.set(dto);

      await this._validateModel(appointment);

      await this._searchConflicts(appointment);

      await appointment.save();

      return appointment.serialize();

    } catch (error) {
      this._errorHandler(error);
    }
  }

  async deleteByUUID(dto) {
    try {
      const appointment = await database.appointments.findOne({
        where: {
          uuid: dto.uuid,
        },
      });

      if (!appointment) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'appointment not found',
        });
      }

      await appointment.destroy();

    } catch (error) {
      this._errorHandler(error);
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

        throw new CustomErrors.ValidationError(
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
