const bodyParser = require('body-parser')

const patient = require('./patientRoutes')
const doctor = require('./doctorRoutes')

module.exports = app => {
  app.use(
    bodyParser.json(),
    patient,
    doctor
  )
}