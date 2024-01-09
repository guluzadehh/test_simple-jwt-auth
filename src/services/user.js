const { User } = require('../models/');
const { passwordsMatch, emailUnique } = require('../validations/user-create');

const createUser = async (data) => {
  const user = User.build(data);

  await user.validate();

  const { password, conf_password } = data;
  passwordsMatch(password, conf_password);

  const email = data.email || "";
  emailUnique(email);

  await user.save();
  return user;
}

module.exports = {
  createUser
}