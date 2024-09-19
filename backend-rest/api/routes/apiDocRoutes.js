const { Router } = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const router = Router()

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MedPlanner Rest API',
            version: '0.0.6',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local Development server',
            },
        ],
    },
    apis: [path.join(__dirname, './patientRoutes.js')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports = router
