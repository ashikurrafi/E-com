const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", require("./routes/authRoutes"));

app.get("/test", (req, res) => {
  res.send("Test API is working [GET]");
});

module.exports = app;
