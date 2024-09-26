const { StatusCodes } = require('http-status-codes');
const CustomErrors = require('../errors/customErrors');

class BaseController {
    static _handleErrorResponse(res, error) {
        if (error instanceof CustomErrors.NotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error.message
            });
        }

        if (error instanceof CustomErrors.ValidationError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
                errors: error.details
            });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
}

module.exports = BaseController;
