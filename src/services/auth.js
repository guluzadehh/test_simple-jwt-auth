const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const errors = require('../utils/errors');

const authorize = async (data) => {
  const user = await User.findOne({ where: { email: data.email } });

  if (!user) {
    throw errors.AuthorizationError("Wrong email or password.");
  }

  const passwordsMatch = await bcrypt.compare(data.password, user.password);
  if (!passwordsMatch) {
    throw new errors.AuthorizationError("Wrong email or password");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

module.exports = { authorize }