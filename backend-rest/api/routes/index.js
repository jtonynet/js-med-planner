const bodyParser = require('body-parser')

const patient = require('./patientRoutes')

module.exports = app => {
  app.use(
    bodyParser.json(),
    patient
  )
}