const { Router } = require('express')
const PatientController = require('../controllers/patientController')

const router = Router()

router
  .post('/patients', PatientController.createPatient)
  .get('/patients', PatientController.retrievePatientsList)

module.exports = router