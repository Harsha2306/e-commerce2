const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

// import required routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const URI = process.env.MONGODB_URI;
const PORT = Number(process.env.PORT) || 4000;

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "https://e-commerce2-frontend-psi.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes
app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(userRoutes);

// establishing connection with mongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(URI);
    app.listen(PORT);
  } catch (error) {}
};
connectToDB();

// used to handle errors thrown from next()
app.use((err, req, res, next) => {
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
