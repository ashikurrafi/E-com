const jwt = require("jsonwebtoken");

const createToken = async (data) => {
  return await jwt.sign(data, process.env.SECRET, { expiresIn: "7d" });
};

module.exports = { createToken };
