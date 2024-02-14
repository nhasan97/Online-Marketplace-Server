const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenGenerator = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "365d",
  });
};

module.exports = tokenGenerator;
