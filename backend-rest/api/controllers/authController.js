const { StatusCodes } = require('http-status-codes');
const { doctors } = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body

        try {
            const doctor = await doctors.findOne({
                attributes: ['id', 'uuid', 'email', 'password'],
                where: {
                    email
                }
            })

            if (!doctor) {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: 'unregistered doctor' })
            }

            const passwordIsValid = await compare(String(password), doctor.password)

            if (!passwordIsValid) {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: 'invalid email or password' })
            }

            const accessToken = sign({
                uuid: doctor.uuid,
                email: doctor.email
            }, jsonSecret.secret, {
                expiresIn: 86400
            })

            res.status(200).send(accessToken)

        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).send({ message: 'not authorized' })
        }
    }
}

module.exports = AuthController