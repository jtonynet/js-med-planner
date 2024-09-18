const { Router } = require('express')
const PatientController = require('../controllers/patientController')

const router = Router()

router
  .post('/patients', PatientController.createPatient)
  .get('/patients', PatientController.retrievePatientsList)
  .get('/patients/:uniqueId', PatientController.retrievePatientByUUID)

module.exports = router