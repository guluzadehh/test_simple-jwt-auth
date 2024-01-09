class APIError extends Error {
  name = 'APIError'

  constructor(message, status) {
    super(message)
    this.key = 'message'
    this.status = status
  }
}

class ValidationError extends APIError {
  name = 'ValidationError'

  constructor(details) {
    super('Validation error occured', 400)
    this.details = details
  }
}

class InternalError extends APIError {
  name = 'InternalError'

  constructor(message = 'Something went wrong...') {
    super(message, 500)
  }
}

class ConflictError extends APIError {
  name = 'ConflictError'

  constructor(message) {
    super(message, 409)
  }
}

class AuthorizationError extends APIError {
  name = 'AuthorizationError'

  constructor(message) {
    super(message, 401)
  }
}

module.exports = {
  APIError, ValidationError, InternalError, ConflictError, AuthorizationError
}
