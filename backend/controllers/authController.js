const User = require("../models/user");
const { handleError } = require("../util/handleError");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorFields = errors.array().map((err) => {
        return { field: err.path, errorMessage: err.msg };
      });
      throw handleError({
        message: "Validation Error",
        statusCode: 422,
        errorFields,
        ok: false,
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      throw handleError({
        message: "Error occured while hashing password",
        statusCode: 422,
        ok: false,
      });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    if (!savedUser) {
      throw handleError({
        message: "Error occured while saving user",
        statusCode: 500,
        ok: false,
      });
    }
    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorFields = errors.array().map((err) => {
        return { field: err.path, errorMessage: err.msg };
      });
      throw handleError({
        message: "Validation Error",
        statusCode: 422,
        errorFields,
        ok: false,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw handleError({
        message: "Email not found",
        statusCode: 404,
        ok: false,
        errorFields: [
          { field: "email", errorMessage: "Please check your credentials" },
        ],
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw handleError({
        message: "password not found",
        statusCode: 404,
        ok: false,
        errorFields: [
          { field: "password", errorMessage: "Please check your credentials" },
        ],
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "7f93e4b124aae1d583527e1fc6750b72b39c78d183b5b365c6485b95b204a623",
      {
        expiresIn: "24h",
        //expiresIn: 60,
      }
    );
    console.log(token);
    res.status(200).json({
      token,
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};
