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
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Appointments
  *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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

/**
 * @swagger
 * /patients/{uuid}/appointments:
 *   get:
 *     summary: Retrieve Appointment List by Patient UUID
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Appointments
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/response.Appointment'
 */
router.get('/patients/:uuid/appointments', AppointmentController.retrieveListByPatientUUID);

module.exports = router;
