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
 *           example: "house.md@gmail.com"
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
 *           required: true
 *           example: "5511912345678"
 *         email:
 *           type: string
 *           required: true
 *           example: "pedro@gmail.com"
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
 *           example: 5521999998888
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
 *           example: "5511912345678"
 *         email:
 *           type: string
 *           example: "pedro@gmail.com"
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
 *           required: false
 *           example: "Primeira consulta da Tarde"
 *         observation:
 *           type: string
 *           required: false
 *           example: "Exames mais profundos por conta das dores nas costas"
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
 *         observation:
 *           type: string
 *           example: "Exames mais profundos por conta das dores nas costas"
 *         startTime:
 *           type: string date
 *           example: "2028-12-20 17:00:00"
 *         endTime:
 *           type: string date
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
 *         observation:
 *           type: string
 *           example: "Exames mais profundos por conta das dores nas costas"
 *         startTime:
 *           type: string date
 *           example: "2028-12-20 16:30:00"
 *         endTime:
 *           type: string date
 *           example: "2028-12-20 16:30:00"
 * 
 *     response.AppointmentWithPatient:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string uuid
 *           example: "ccd71acf-7be4-42dc-b562-a7807d70c173"
 *         description:
 *           type: string
 *           example: "Primeira consulta da manhã"
 *         observation:
 *           type: string
 *           example: "Exames mais profundos por conta das dores nas costas"
 *         startTime:
 *           type: string date
 *           example: "2028-12-20 16:30:00"
 *         endTime:
 *           type: string date
 *           example: "2028-12-20 16:30:00"
 *         patient:
 *           type: object
 *           properties:
 *             uuid:
 *               type: string uuid
 *               example: "69be741b-3bf4-41a2-9b44-0e8b655a54dd"
 *             name:
 *               type: string
 *               example: "Pedro Prado"
 * 
 *     response.NotFoundError:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Resource not found"
 * 
 *     response.ValidationError:
 *       description: Validation error(s) on request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Validation error(s) on request encountered
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                     message:
 *                       type: string
 *
 *     response.InternalServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: An unexpected error occurred
 *
 */
