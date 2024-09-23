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
      version: '0.0.9',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, './authRoutes.js'),
    path.join(__dirname, './patientRoutes.js'),
    path.join(__dirname, './apointmentRoutes.js'),
    path.join(__dirname, './swagger/schemas.js'),
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports = router
