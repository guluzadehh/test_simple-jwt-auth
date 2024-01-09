const userServices = require('../services/user');

const login = async (req, res, next) => {
  console.log("Login");
  res.send();
};

const register = async (req, res) => {
  const user = await userServices.createUser(req.body);
  return res.json(user.toJSON());
}


module.exports = {
  login, register
}