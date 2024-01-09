const { User } = require('../models/')
const errors = require('../errors')

const login = async (req, res, next) => {
  console.log("Login");
  res.send();
};

const register = [
  (req, res, next) => {
    const { password, conf_password } = req.body;

    if (password !== conf_password) {
      throw new errors.ValidationError({ conf_password: "Passwords do not match." });
    }

    next();
  },

  async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) throw new errors.ConflictError('Email is already taken');
    next();
  },

  // image check

  async (req, res) => {
    const user = await User.create(req.body);
    return res.json(user.toJSON());
  }
]

module.exports = {
  login, register
}