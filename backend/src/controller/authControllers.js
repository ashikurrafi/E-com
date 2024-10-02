const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/tokenCreate");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return responseReturn(res, 400, {
      message: "Email and password are required",
    });
  }

  try {
    const admin = await adminModel.findOne({ email }).select("+password");

    if (admin) {
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = createToken({ id: admin._id, role: admin.role });
        res.cookie("accessToken", token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 200, { token, message: "Login successful" });
        console.log(token);
      } else {
        responseReturn(res, 401, { error: "Invalid password" });
      }
    } else {
      responseReturn(res, 401, { error: "Invalid email" });
    }
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id, role } = req;
  try {
    if (role === "admin") {
      const user = await adminModel.findById(id);
      responseReturn(res, 200, { userInfo: user });
    } else {
      console.log("Seller info");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const sellerRegister = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const existingSeller = await sellerModel.findOne({ email });
    if (existingSeller) {
      return responseReturn(res, 400, { error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = await sellerModel.create({
      name,
      email,
      password: hashedPassword,
      method: "manually",
      shopInfo: {},
    });

    console.log(seller);

    await sellerCustomerModel.create({
      myId: seller.id,
    });

    const token = createToken({ id: seller.id, role: seller.role });
    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    responseReturn(res, 201, { token, message: "Registration successful" });
  } catch (error) {
    console.error("Error during seller registration:", error.message);
    responseReturn(res, 500, { error: "Internal server error" });
  }
};

module.exports = { adminLogin, getUser, sellerRegister };
