const jwt = require("jsonwebtoken");
const ENV_KEYS = require("./ENV_KEYS");
const moment = require("moment");
const responseHandler = require("../utils/responseHandler");
const secretTokenKey = ENV_KEYS.TOKEN_SECRET_KEY;

const { encryptDataCrypt, decryptDataCrypt } = require("./encrypt-decrypt");

const jwtSign = (user) => {
  const encryptedToken = encryptDataCrypt(JSON.stringify(user));

  const token = jwt.sign(
    {
      encryptedData: encryptedToken,
    },
    secretTokenKey,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

const jwtSignRefreshToken = (user) => {
  const token = jwt.sign(user, secretTokenKey, {
    expiresIn: "1d",
  });

  return token;
};

const jwtVerify = async (token, req, res, next) => {
  await jwt.verify(token.accessToken, secretTokenKey, (err, decoded) => {
    if (err) {
      if (Date.now() >= err.expiredAt) {
        return responseHandler.tokenExpired(res);
      }

      return responseHandler.unauthorize(res, "Unauthorize");
    }

    const tokenDecrypted = decryptDataCrypt(decoded.encryptedData);
    // id, username, newName
    req.user = tokenDecrypted;
    next();
  });
};

const jwtDecode = (token) => {
  let decodedToken = jwt.decode(token);
  return decodedToken;
};

const jwtExpire = (token) => {
  let decodedToken = jwt.decode(token);
  // jwt decoded => encryptedData, iat, exp 
  const dateExpired = new Date(decodedToken.exp * 1000).toDateString();
  return moment(dateExpired).format("DD-MM-YYYY");
};

module.exports = {
  jwtVerify,
  jwtSign,
  jwtSignRefreshToken,
  jwtDecode,
  jwtExpire,
};
