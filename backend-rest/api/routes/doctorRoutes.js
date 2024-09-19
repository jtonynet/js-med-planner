const { Router } = require('express')
const DoctorController = require('../controllers/doctorController')

const router = Router()

router
  .post('/doctors', DoctorController.create)

module.exports = router
