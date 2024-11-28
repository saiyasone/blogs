const { jwtVerify, jwtDecode } = require("../utils/jwtToken");
const { logError } = require("../utils/logs");
const responseHandler = require("../utils/responseHandler");

const isAuthenticated = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return responseHandler.unauthorize(res, "No token provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return responseHandler.unauthorize(res, "No token provided");
  }

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken?.encryptedData) {
      const jwtToken = {
        accessToken: token,
        encryptedData: decodedToken.encryptedData,
      };
      jwtVerify(jwtToken, req, res, next);
    } else {
      responseHandler.unauthorize(res, "Invalid token");
    }
  } catch (error) {
    logError(error, "authentication failed");
    responseHandler.forbidden(res, error);
  }
};

module.exports = isAuthenticated;
