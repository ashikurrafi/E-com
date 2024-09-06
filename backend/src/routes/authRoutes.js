const express = require("express");
const { adminLogin } = require("../controller/authControllers"); // Fixed the path and name

const router = express.Router();

router.route("/admin-login").post(adminLogin);

module.exports = router;
