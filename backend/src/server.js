const dotenv = require("dotenv");
const connectDataBase = require("./config/db");
const app = require("../src/app");

dotenv.config({ path: "./.env" });

connectDataBase()
  .then(
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        "info",
        `Server is running ar http://localhost:${process.env.SERVER_PORT}`
      );
    })
  )
  .catch((err) => {
    console.log("MongoDB connection failed !!! ", err);
  });
