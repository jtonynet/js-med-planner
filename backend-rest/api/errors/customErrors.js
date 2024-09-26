class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends CustomError {
  constructor(message, details = []) {
    super(message);
    this.details = details;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
  }
}

class InternalServerError extends CustomError {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  CustomError,
  ValidationError,
  NotFoundError,
  InternalServerError
};
