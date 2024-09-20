/**
 * @swagger
 * components:
 *   schemas:
 * 
 *     request.Auth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *           example: "house@md.com"
 *         password:
 *           type: string
 *           required: true
 *           example: "lupos"
 * 
 *     request.Patient:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string uuid
 *           required: true
 *           example: "69be741b-3bf4-41a2-9b44-0e8b655a54dd"
 *         name:
 *           type: string
 *           required: true
 *           example: "Pedro Prado"
 *         phone:
 *           type: string
 *           example: "+5511912345678"
 *         email:
 *           type: string
 *           required: true
 *           example: "pedro@xmail.com"
 *         birthDate:
 *           type: string date
 *           required: true 
 *           example: "1990-05-15"
 *         gender:
 *           type: string
 *           required: true
 *           enum: 
 *             - male
 *             - female
 *             - other
 *             - none
 *           example: "male"
 *         height:
 *           type: number
 *           format: float
 *           required: true
 *           example: 1.75
 *         weight:
 *           type: number
 *           format: float
 *           required: true
 *           example: 72.50
 * 
 *     request.PatientUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Paula Prado
 *         phone:
 *           type: string
 *           example: +5521999998888
 *         birthDate:
 *           type: string
 *           format: date
 *           example: 1980-05-15
 *         gender:
 *           type: string
 *           enum: 
 *             - male
 *             - female
 *             - other
 *             - none
 *           example: "male"
 *         height:
 *           type: number
 *           format: float
 *           example: 1.80
 *         weight:
 *           type: number
 *           format: float
 *           example: 55.50
 * 
 *     response.Patient:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           example: "69be741b-3bf4-41a2-9b44-0e8b655a54dd"
 *         name:
 *           type: string
 *           example: "Pedro Prado"
 *         phone:
 *           type: string
 *           example: "+5511912345678"
 *         email:
 *           type: string
 *           example: "pedro@xmail.com"
 *         birthDate:
 *           type: string
 *           example: "1990-05-15"
 *         gender:
 *           type: string
 *           example: "male"
 *         height:
 *           type: string
 *           example: "1.75"
 *         weight:
 *           type: string
 *           example: "72.50"
 */
