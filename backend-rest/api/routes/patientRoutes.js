const { Router } = require('express')
const PatientController = require('../controllers/patientController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.use(authenticate)

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

router
  .post('/patients', PatientController.create)
  .get('/patients/:uuid', PatientController.retrieveByUUID)
  .patch('/patients/:uuid', PatientController.updateByUUID)
  .delete('/patients/:uuid', PatientController.deleteByUUID)


module.exports = router