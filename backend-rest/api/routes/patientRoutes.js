const { Router } = require('express')
const PatientController = require('../controllers/patientController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.use(authenticate)

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create Patient
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Patients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/request.Patient'
 *     responses:
 *       201:
 *         description: One patient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Patient'
 */
router.post('/patients', PatientController.create)

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve Patient List
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Patients
 *     responses:
 *       200:
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/response.Patient'
 */
router.get('/patients', PatientController.retrieveList)

/**
 * @swagger
 * /patients/{uuid}:
 *   get:
 *     summary: Retrieve Patient by uuid
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: One patient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Patient'
 */
router.get('/patients/:uuid', PatientController.retrieveByUUID)

/**
 * @swagger
 * /patients/{uuid}:
 *   patch:
 *     summary: Update Patient by UUID
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the patient to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/request.PatientUpdate'
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Patient'
 *       400:
 *         description: Bad request, invalid parameters
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient not found
 */
router.patch('/patients/:uuid', PatientController.updateByUUID)

/**
 * @swagger
 * /patients/{uuid}:
 *   delete:
 *     summary: Delete a Patient by UUID
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the patient to delete
 *     responses:
 *       204:
 *         description: No Content Patient deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.delete('/patients/:uuid', PatientController.deleteByUUID)

module.exports = router