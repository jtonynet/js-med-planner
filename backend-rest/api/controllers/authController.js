const { StatusCodes } = require('http-status-codes');
const { doctors } = require('../models');
const CustomErrors = require('../errors/customErrors');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

class AuthController {
  /*
    TODO:
      This class is outside the desired standard for the project.
      It is the minimum for me to have functional authorization on 
      the routes. Desirable feature in a first version of the project

      1. Create service
      2. Enhance feature auth with roles
  */
  static async login(req, res) {
    const { email, password } = req.body

    try {
      let doctor = doctors.build({ email, password });

      if (!email) {
        throw new CustomErrors.ValidationError(
          'Validation error(s) encountered',
          [{
            "field": "email",
            "message": "Informe o campo"
          }]
        );
      }

      if (!password) {
        throw new CustomErrors.ValidationError(
          'Validation error(s) encountered',
          [{
            "field": "password",
            "message": "Informe o campo"
          }]
        );
      }

      doctor = await doctors.findOne({
        attributes: ['id', 'uuid', 'email', 'password'],
        where: {
          email
        }
      });

      if (!doctor) {
        throw new Error('unregistered doctor');
      }

      const passwordIsValid = await compare(String(password), doctor.password);

      if (!passwordIsValid) {
        throw new Error('invalid password');
      }

      const accessToken = sign({
        uuid: doctor.uuid,
        email: doctor.email
      }, jsonSecret.secret, {
        expiresIn: 86400
      });

      res.status(200).send(accessToken);

    } catch (error) {
      if (error instanceof CustomErrors.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
          errors: error.details
        });
      }

      console.log(error)
      res.status(StatusCodes.UNAUTHORIZED).send({ message: 'not authorized' });
    }
  }
}

module.exports = AuthController;
