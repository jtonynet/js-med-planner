const { Router } = require('express')
const PatientController = require('../controllers/patientController')
const authenticate = require('../middlewares/authenticate')

const router = Router()

router.use(authenticate)

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve a list of patients
 *     responses:
 *       200:
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                     example: "69be741b-3bf4-41a2-9b44-0e8b655a54dd"
 *                   name:
 *                     type: string
 *                     example: "Pedro Prado"
 *                   email:
 *                     type: string
 *                     example: "pedro@xmail.com"
 */
router.get('/patients', PatientController.retrieveList)


router
  .post('/patients', PatientController.create)
  .get('/patients/:uuid', PatientController.retrieveByUUID)
  .patch('/patients/:uuid', PatientController.updateByUUID)
  .delete('/patients/:uuid', PatientController.deleteByUUID)


module.exports = router