const bodyParser = require('body-parser');
const apiDoc = require('./apiDocRoutes');
const auth = require('./authRoutes');
const patient = require('./patientRoutes');
const appointment = require('./apointmentRoutes');
const observation = require('./observationRoutes');

module.exports = app => {
  app.use(
    bodyParser.json(),
    apiDoc,
    auth,
    patient,
    appointment,
    observation
  );
};
