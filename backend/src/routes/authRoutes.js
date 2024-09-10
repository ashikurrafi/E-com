const express = require("express");
const router = express.Router();
const { adminLogin, getUser } = require("../controller/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/admin-login", adminLogin);
router.get("/get-user", authMiddleware, getUser);

module.exports = router;
