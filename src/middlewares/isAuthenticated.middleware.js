const { jwtVerify, jwtDecode } = require("../utils/jwtToken");
const responseHandler = require("../utils/responseHandler");

const isAuthenticated = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return responseHandler.emptyToken(res);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return responseHandler.emptyToken(res);
  }

  const decodedToken = jwtDecode(token);
  if (decodedToken?.encryptedData) {
    const jwtToken = {
      accessToken: token,
      encryptedData: decodedToken.encryptedData,
    };
    jwtVerify(jwtToken, req, res, next);
  } else {
    responseHandler.unauthorize(res, "User is not authorized");
  }
};

module.exports = isAuthenticated;
