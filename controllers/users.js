const login = async (req, res, next) => {
  console.log("Login");
  res.send();
};

const register = async (req, res, next) => {
  console.log("Register");
  res.send();
};

module.exports = {
  login, register
}