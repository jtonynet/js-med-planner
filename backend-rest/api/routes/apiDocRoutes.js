const { Router } = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerDocument.json')

const router = Router()

router
    .use('/docs', swaggerUi.serve)
    .get('/docs', swaggerUi.setup(swaggerDocument));

module.exports = router
