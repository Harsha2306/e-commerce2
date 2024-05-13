const express = require("express");

const authController = require("../controllers/authController");
const authValidator = require("../validators/authValidator");

const router = express.Router();

router.post(
  "/register",
  [
    authValidator.validateFirstName,
    authValidator.validateLastName,
    authValidator.validateEmail,
    authValidator.validatePassword,
  ],
  authController.registerUser
);

router.post(
  "/login",
  authValidator.validateLoginCredentials,
  authController.login
);
module.exports = router;

