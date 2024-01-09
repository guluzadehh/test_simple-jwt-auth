const { User } = require('../models/')
const errors = require('../errors')

const login = async (req, res, next) => {
  console.log("Login");
  res.send();
};

const register = async (req, res) => {
  const user = User.build(req.body);
  await user.validate();

  const { password, conf_password } = req.body;

  if (password !== conf_password) {
    throw new errors.ValidationError({ conf_password: "Passwords do not match." });
  }

  const email = req.body.email || "";
  const exists = await User.findOne({ where: { email } });
  if (exists) throw new errors.ConflictError('Email is already taken');

  user.save();
  return res.json(user.toJSON());
}


module.exports = {
  login, register
}