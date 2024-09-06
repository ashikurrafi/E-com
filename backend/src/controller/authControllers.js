// const adminModel = require("../models/adminModel");
// const { responseReturn } = require("../utils/response");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { createToken } = require("../utils/tokenCreate");

// const adminLogin = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return responseReturn(res, 404, {
//       message: "Email and password are required",
//     });
//   }
//   try {
//     const admin = await adminModel.findOne({ email }).select("+password");
//     if (admin) {
//       const match = await bcrypt.compare(password, admin.password);
//       console.log(match);
//       if (match) {
//         const token = await createToken({
//           id: admin.id,
//           role: admin.role,
//         });
//         res.cookie("accessToken", token, {
//           expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//         });
//         responseReturn(res, 200, {
//           token,
//           message: "Login successfull",
//         });
//       } else {
//         responseReturn(res, 404, { error: "Password didn't match" });
//       }
//     } else {
//       return responseReturn(res, 404, { error: "Admin not found" });
//     }
//   } catch (error) {
//     responseReturn(res, 500, { error: error.message });
//   }
// };

// module.exports = { adminLogin };

const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/tokenCreate");

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
      responseReturn(res, 401, { error: "Admin not found" });
    }
  } catch (error) {
    responseReturn(res, 500, { error: error.message });
  }
};

module.exports = { adminLogin };
