const { StatusCodes } = require('http-status-codes');
const { doctors } = require('../models');
const { hash } = require('bcryptjs')

class DoctorController {
    static async create(req, res) {
        try {
            const {
                uuid, name, email, password
            } = req.body;

            const passwordHash = await hash(String(password), 8);

            const newDoctor = await doctors.create({
                uuid,
                name,
                email,
                password: passwordHash
            });

            console.log(newDoctor);

            res.status(StatusCodes.CREATED).json(newDoctor);
        } catch (error) {
            console.log(error);

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating doctor' });
        }
    }
}

module.exports = DoctorController
