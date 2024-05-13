const jwt = require("jsonwebtoken");

const { handleError } = require("./handleError");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    console.log(authHeader);
    if (!authHeader) {
      throw handleError({
        message: "Not Authorized",
        statusCode: 401,
        ok: false,
      });
    }
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "7f93e4b124aae1d583527e1fc6750b72b39c78d183b5b365c6485b95b204a623"
    );
    if (!decodedToken) {
      throw handleError({
        message: "Not Authorized",
        statusCode: 401,
        ok: false,
      });
    }
    req.userId = decodedToken.userId;
  } catch (error) {
    next(error);
  }
  next();
};
