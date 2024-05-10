const mongoose = require("mongoose");

const databaseName = "E-commerce";

const connectDataBase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${databaseName}`
    );
    console.log("info", "Connected to MongoDB successfully !!!");
    console.log("info", `Connected to ${connectionInstance.connection.host}`);
    console.log(
      "info",
      `Connected to ${process.env.MONGODB_URL}/${databaseName}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed : ${error}`);
    process.exit(1);
  }
};

module.exports = connectDataBase;
