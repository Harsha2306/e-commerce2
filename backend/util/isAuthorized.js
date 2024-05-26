const jwt = require("jsonwebtoken");

const { handleError } = require("./handleError");

const SECRET =
  "7f93e4b124aae1d583527e1fc6750b72b39c78d183b5b365c6485b95b204a623";

exports.isAuthorized = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw handleError({
        message: "Not Authorized",
        statusCode: 401,
        ok: false,
      });
    }
    const token = req.get("Authorization").split(" ")[1];
    if (!token) {
      throw handleError({
        message: "Token missing in authorization header",
        statusCode: 401,
        ok: false,
      });
    }
    const decodedToken = jwt.verify(token, SECRET);
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

exports.isAuthorizedFlag = (req) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return false;
    const token = authHeader.split(" ")[1];
    if (!token) return false;
    const decodedToken = jwt.verify(token, SECRET);
    if (!decodedToken) return false;
    req.userId = decodedToken.userId;
    return true;
  } catch (error) {
    return false;
  }
};
