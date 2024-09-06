const adminLogin = async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Admin login request received." });
};

module.exports = { adminLogin };
