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
 *         description: New resource created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Appointment'
 *       400:
 *         $ref: '#/components/schemas/response.ValidationError'
 *       401:
 *         description: Unauthorized
 *       404:
 *         $ref: '#/components/schemas/response.NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
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
 *         description: Resource list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/response.Appointment'
 *       401:
 *         description: Unauthorized
 *       404:
 *         $ref: '#/components/schemas/response.NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.get('/patients/:uuid/appointments', AppointmentController.retrieveListByPatientUUID);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Retrieve Appointment List by Authorized Doctor
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Appointments
 *     responses:
 *       200:
 *         description: Resource list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/response.Appointment'
 *       401:
 *         description: Unauthorized
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.get('/appointments', AppointmentController.retrieveList);

/**
 * @swagger
 * /appointments/{uuid}:
 *   patch:
 *     summary: Update Appointment by UUID
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
 *         description: UUID of the Appointment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/request.AppointmentUpdate'
 *     responses:
 *       200:
 *         description: Resource updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Appointment'
 *       400:
 *         $ref: '#/components/schemas/response.ValidationError'
 *       401:
 *         description: Unauthorized
 *       404:
 *         $ref: '#/components/schemas/response.NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.patch('/appointments/:uuid', AppointmentController.updateByUUID);

/**
 * @swagger
 * /appointments/{uuid}:
 *   delete:
 *     summary: Delete Appointment by UUID
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
 *         description: UUID of the Appointment to delete
 *     responses:
 *       204:
 *         description: No Content
 *       401:
 *         description: Unauthorized
 *       404:
 *         $ref: '#/components/schemas/response.NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.delete('/appointments/:uuid', AppointmentController.deleteByUUID);

module.exports = router;
