const { Router } = require('express');
const AppointmentController = require('../controllers/appointmentController');
const authenticate = require('../middlewares/authenticate');

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /patients/{uuid}/appointments:
 *   post:
 *     summary: Create Appointment by Patient UUID
 *     tags: 
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/request.Appointment'
 *     responses:
 *       201:
 *         description: One Appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Appointment'
 */
router.post('/patients/:uuid/appointments', AppointmentController.create);

module.exports = router;
