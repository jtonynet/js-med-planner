const { Router } = require('express')
const PatientController = require('../controllers/patientController')

const router = Router()

router
  .post('/patients', PatientController.createPatient)
  .get('/patients', PatientController.retrievePatientsList)
  .get('/patients/:uuid', PatientController.retrievePatientByUUID)
  .patch('/patients/:uuid', PatientController.updatePatientByUUID)

module.exports = router