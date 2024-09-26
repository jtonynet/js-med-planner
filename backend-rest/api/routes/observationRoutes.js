const { Router } = require('express');
const ObservationController = require('../controllers/observationController');
const authenticate = require('../middlewares/authenticate');

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /appointments/{uuid}/observations:
 *   post:
 *     summary: Create Observation by Appointment UUID
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Observations
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
 *             $ref: '#/components/schemas/request.Observation'
 *     responses:
 *       201:
 *         description: New resource created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Observation'
 *       400:
 *         $ref: '#/components/schemas/response.ValidationError'
 *       401:
 *         description: Unauthorized
 *       404:
 *         $ref: '#/components/schemas/response.NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.post('/appointments/:uuid/observations', ObservationController.create);

/**
 * @swagger
 * /appointments/{uuid}/observations:
 *   get:
 *     summary: Retrieve Observation list by Appointments UUID
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Observations
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
 *                 $ref: '#/components/schemas/response.Observation'
 *       401:
 *         description: Unauthorized
 *       404:
 *         $ref: '#/components/schemas/response.NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.get('/appointments/:uuid/observations', ObservationController.retrieveListByAppointmentUUID);

module.exports = router;
