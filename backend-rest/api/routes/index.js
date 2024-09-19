const bodyParser = require('body-parser')

const patient = require('./patientRoutes')
const auth = require('./authRoutes')
// const doctor = require('./doctorRoutes') UNDOCUMENTED

module.exports = app => {
  app.use(
    bodyParser.json(),
    patient,
    auth
  )
}