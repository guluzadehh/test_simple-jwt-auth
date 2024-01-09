const errors = require('../errors')
const logger = require('../config/logger')

function convertToAPIError(err) {
  if (err.name === 'SequelizeValidationError') {
    const details = err.errors.reduce((obj, error) => {
      return { ...obj, [error.path]: error.message }
    }, {})

    return new errors.ValidationError(details)
  }

  logger.error(err.message)

  return new errors.InternalError()
}

module.exports = {
  convertToAPIError
}
