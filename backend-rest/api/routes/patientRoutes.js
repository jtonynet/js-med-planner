const { Router } = require('express')
const PatientController = require('../controllers/patientController')

const router = Router()

router
  .post('/patients', PatientController.create)
  .get('/patients', PatientController.retrieveList)
  .get('/patients/:uuid', PatientController.retrieveByUUID)
  .patch('/patients/:uuid', PatientController.updateByUUID)
  .delete('/patients/:uuid', PatientController.deleteByUUID)

module.exports = router