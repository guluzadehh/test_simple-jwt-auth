const { User } = require('../models/');
const { passwordsMatch, emailUnique } = require('../validations/user-create');

const createUser = async (data) => {
  const user = User.build(data);

  await user.validate();

  const { password, conf_password } = data;
  passwordsMatch(password, conf_password);

  const email = data.email || "";
  await emailUnique(email);

  await user.save();
  return user;
}

const listUsers = async () => {
  const users = await User.findAll({ order: [['createdAt', 'DESC']] });
  return users;
}

const fetchUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
}

module.exports = {
  createUser, listUsers, fetchUserById
}