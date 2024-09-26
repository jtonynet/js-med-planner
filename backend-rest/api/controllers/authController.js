const { StatusCodes } = require('http-status-codes');
const { doctors } = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

class AuthController {
  /*
    TODO:
      1. Create service
      2. Enhance feature auth
  */
  static async login(req, res) {
    const { email, password } = req.body

    try {
      const doctor = await doctors.findOne({
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
        throw new Error('invalid email or password');
      }

      const accessToken = sign({
        uuid: doctor.uuid,
        email: doctor.email
      }, jsonSecret.secret, {
        expiresIn: 86400
      });

      res.status(200).send(accessToken);

    } catch (error) {
      console.log(error)
      res.status(StatusCodes.UNAUTHORIZED).send({ message: 'not authorized' });
    }
  }
}

module.exports = AuthController;
