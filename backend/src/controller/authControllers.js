const adminModel = require("../models/adminModel");

const adminLogin = async (req, res) => {
  console.log("Admin login");
  console.log(req.body);
};

module.exports = { adminLogin };
