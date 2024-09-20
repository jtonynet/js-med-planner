const { Router } = require('express');
const AppointmentController = require('../controllers/appointmentController');
const authenticate = require('../middlewares/authenticate');

const router = Router();

router.use(authenticate);

router.post('/patients/:uuid/appointments', AppointmentController.create);

module.exports = router;
