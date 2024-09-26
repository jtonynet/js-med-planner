const { Router } = require('express');
const PatientController = require('../controllers/patientController');
const authenticate = require('../middlewares/authenticate');

const router = Router();

router.use(authenticate);

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
 *         description: New resource created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Patient'
 *       400:
 *         $ref: '#/components/schemas/response.ValidationError'
 *       401:
 *         description: Unauthorized
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 * 
 */
router.post('/patients', PatientController.create);

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
 *         description: Resource list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/response.Patient'
 *       401:
 *         description: Unauthorized
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.get('/patients', PatientController.retrieveList);

/**
 * @swagger
 * /patients/{uuid}:
 *   get:
 *     summary: Retrieve Patient by UUID
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
 *         description: One resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Patient'
 *       401:
 *         description: Unauthorized
 *       404:
 *         $ref: '#/components/schemas/response.NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.get('/patients/:uuid', PatientController.retrieveByUUID);

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
 *         description: Resource updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response.Patient'
 *       400:
 *         $ref: '#/components/schemas/response.ValidationError'
 *       401:
 *         description: Unauthorized
 *       404:
 *         $ref: '#/components/schemas/response.NotFoundError'
 *       500:
 *         $ref: '#/components/schemas/response.InternalServerError'
 */
router.patch('/patients/:uuid', PatientController.updateByUUID);

/**
 * @swagger
 * /patients/{uuid}:
 *   delete:
 *     summary: Delete Patient by UUID
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
 *         description: UUID of the Patient to delete
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
router.delete('/patients/:uuid', PatientController.deleteByUUID);

module.exports = router;
