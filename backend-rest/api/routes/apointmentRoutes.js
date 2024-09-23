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

/**
 * @swagger
 * /appointments/{uuid}:
 *   patch:
 *     summary: Update Patient by UUID
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
 *         description: UUID of the Appointments to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/request.AppointmentUpdate'
 *     responses:
 *       200:
 *         description: Appointments updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Appointment'
 *       400:
 *         description: Bad request, invalid parameters
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient not found
 */
router.patch('/appointments/:uuid', AppointmentController.updateByUUID);

module.exports = router;
