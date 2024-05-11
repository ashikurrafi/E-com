const router = require("express").Router();
const authControllers = require("../controller/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddleware, authControllers.getUser);

module.exports = router;
