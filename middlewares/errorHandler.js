const { APIError } = require('../errors')
const { convertToAPIError } = require('../helpers')

module.exports = (err, req, res) => {
  if (!(err instanceof APIError)) {
    err = convertToAPIError(err)
  }

  const errObj = {
    name: err.name,
    [err.key]: err.message
  }

  if (err.details) {
    errObj.details = err.details
  }

  res.status(err.status).json(errObj)
}
