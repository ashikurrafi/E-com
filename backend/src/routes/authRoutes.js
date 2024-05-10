const router = require("express").Router();
const authControllers = require("../controller/authControllers");

router.post("/admin-login", authControllers.admin_login);

module.exports = router;
