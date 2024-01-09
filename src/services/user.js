const { User } = require('../models/');
const { passwordsMatch, emailUnique } = require('../validations/user-create');

const createUser = async (data) => {
  const user = User.build(req.body);

  await user.validate();

  const { password, conf_password } = req.body;
  passwordsMatch(password, conf_password);

  const email = req.body.email || "";
  emailUnique(email);

  await user.save();
  return user;
}

module.exports = {
  createUser
}