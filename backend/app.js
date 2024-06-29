const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();

// import required routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const URI = process.env.MONGODB_URI;
const PORT = Number(process.env.PORT) || 4000;

const app = express();

app.use(
  cors({
    origin: ["e-commerce2-frontend-psi.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// establishing connection with mongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(URI);
    app.listen(PORT);
  } catch (error) {}
};
connectToDB();

app.use(helmet());
// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Define routes
app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(userRoutes);

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
