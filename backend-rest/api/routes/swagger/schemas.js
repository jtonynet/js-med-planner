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
 *         birth_date:
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
