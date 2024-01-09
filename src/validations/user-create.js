const { User } = require('../models/')
const errors = require('../utils/errors')

const passwordsMatch = (password, confPassword) => {
  if (password !== confPassword) {
    throw new errors.ValidationError({ conf_password: "Passwords do not match." });
  }
};

const emailUnique = async (email) => {
  const user = await User.findOne({ where: { email } })
  if (user) throw new errors.ConflictError('Email is already taken');
}

module.exports = {
  passwordsMatch, emailUnique
}