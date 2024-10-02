const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "seller",
    },

    status: {
      type: String,
      default: "pending",
    },
    payment: {
      type: String,
      default: "inactive",
    },
    method: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    shopInfo: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sellers", sellerSchema);
