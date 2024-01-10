const { User } = require('../models/');
const { saveImage, generateImageName } = require('../utils');
const { passwordsMatch, emailUnique } = require('../validations/user-create');

const createUser = async (req) => {
  const user = User.build(req.body);

  await user.validate();

  const { password, conf_password } = req.body;
  passwordsMatch(password, conf_password);

  const email = req.body.email || "";
  await emailUnique(email);

  const originalName = req.file?.originalname;
  if (originalName != null) {
    const photo = saveImage(generateImageName(originalName), req.file?.buffer);
    user.photo = photo;
  }

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

const updateUser = async (req) => {
  const user = await fetchUserById(req.params?.id);

  const email = req.body.email || "";
  if (user.email !== email) {
    await emailUnique(email);
  }

  const data = { ...req.body };

  const originalName = req.file?.originalname;
  if (originalName != null) {
    const photo = saveImage(generateImageName(originalName), req.file?.buffer);
    data.photo = photo;
  }

  await user.update(data, {
    fields: ['first_name', 'last_name', 'email', 'gender', 'photo']
  });

  return user;
}

module.exports = {
  createUser, listUsers, fetchUserById, updateUser
}