const CustomErrors = require('../errors/customErrors');

class BaseService {
  async _validateModel(model) {
    try {

      await model.validate();

    } catch (validationError) {
      const errorDetails = validationError.errors.map(err => ({
        field: err.path,
        message: err.message
      }));

      throw new CustomErrors.ValidationError(
        'Validation error(s) encountered',
        errorDetails
      );
    }
  }

  _errorHandler(error) {
    switch (error.constructor.name) {
      case 'ValidationError':
      case 'NotFoundError':
        throw error;
    }

    console.log(error);
    throw new CustomErrors.InternalServerError('An unexpected error occurred');
  }
}

module.exports = BaseService;
