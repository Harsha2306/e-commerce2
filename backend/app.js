const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const URI = process.env.MONGODB_URI;
const PORT = 4000;

const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("CONNECTED TO DB");
    app.listen(PORT);
    console.log("SERVER IS UP");
  } catch (error) {
    console.log("ERROR CONNECTING TO DB");
  }
};
connectToDB();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.statusCode === undefined) {
    err.statusCode = 500;
    err.ok = false;
  }
  const { statusCode, errorFields, ok, message } = err;
  return res.status(statusCode).json({
    ok,
    message,
    errorFields,
  });
});
