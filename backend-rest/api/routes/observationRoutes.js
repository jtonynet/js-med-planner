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
 *         description: One patient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Observation'
 */
router.post('/appointments/:uuid/observations', ObservationController.create);

module.exports = router;
