const userServices = require('../services/user');

const listUsers = async (req, res, next) => {
  let start, limit;

  try {
    const pageParams = req.query.page.split(',');
    console.log(pageParams);
    [start, limit] = pageParams.map(Number);
    console.log(start, limit)
  } catch {

  }

  const users = await userServices.listUsers(start, limit);
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