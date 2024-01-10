const userServices = require('../services/user');

const listUsers = async (req, res, next) => {
  const users = await userServices.listUsers();
  res.json(users);
}

const detailUser = async (req, res, next) => {
  const user = await userServices.fetchUserById(req.params.id);
  res.json(user);
}

const updateUser = async (req, res, next) => {
  const user = await userServices.updateUser(req);
  res.json(user);
}

module.exports = {
  listUsers, detailUser, updateUser
}