const { PermissionError } = require("../utils/errors")

const isSameUser = (req, res, next) => {
  if (req.user.id != req.params.id) {
    throw new PermissionError("This account doesn't belong to you.")
  }

  next();
}

module.exports = {
  isSameUser
}