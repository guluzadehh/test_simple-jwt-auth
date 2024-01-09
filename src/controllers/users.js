const userServices = require('../services/user');
const authServices = require('../services/auth');

const login = async (req, res, next) => {
  const token = await authServices.authorize(req.body);
  res.json({
    message: "Logged in successfully",
    token
  });
};

const register = async (req, res) => {
  const user = await userServices.createUser(req.body);
  return res.json(user.toJSON());
}


module.exports = {
  login, register
}