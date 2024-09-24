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
 * 
 *     request.Appointment:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string uuid
 *           required: true
 *           example: "ccd71acf-7be4-42dc-b562-a7807d70c173"
 *         description:
 *           type: string
 *           required: true
 *           example: "Primeira consulta da Tarde"
 *         startTime:
 *           type: string date
 *           required: true 
 *           example: "2028-12-20 16:30:00"
 *         endTime:
 *           type: string date
 *           required: true 
 *           example: "2028-12-20 17:30:00"
 * 
  *     request.AppointmentUpdate:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           example: "Remarcando primeira consulta da tarde"
 *         startTime:
 *           required: true 
 *           example: "2028-12-20 17:00:00"
 *         endTime:
 *           required: true 
 *           example: "2028-12-20 18:00:00"
 * 
 *     response.Appointment:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string uuid
 *           example: "ccd71acf-7be4-42dc-b562-a7807d70c173"
 *         description:
 *           type: string
 *           example: "Primeira consulta da manhã"
 *         startTime:
 *           type: string date
 *           example: "2028-12-20 16:30:00"
 *         endTime:
 *           type: string date
 *           example: "2028-12-20 16:30:00"
 * 
 *     request.Observation:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string uuid
 *           required: true
 *           example: "d8671dab-4d0c-4888-bdc2-99a0e0bb8ca6"
 *         message:
 *           type: string
 *           required: true
 *           example: "Devemos solicitar exames mais profundos"
 * 
 *     response.Observation:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string uuid
 *           example: "d8671dab-4d0c-4888-bdc2-99a0e0bb8ca6"
 *         message:
 *           type: string
 *           example: "Devemos solicitar exames mais profundos"
 */
