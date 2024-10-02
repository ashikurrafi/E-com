const express = require("express");
const router = express.Router();
const {
  adminLogin,
  getUser,
  sellerRegister,
} = require("../controller/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/admin-login", adminLogin);
router.get("/get-user", authMiddleware, getUser);
router.post("/seller-register", sellerRegister);

module.exports = router;
