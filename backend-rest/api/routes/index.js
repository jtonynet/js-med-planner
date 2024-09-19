const bodyParser = require('body-parser')
const auth = require('./authRoutes')
const patient = require('./patientRoutes')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    patient
  )
}