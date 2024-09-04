const ENV_KEYS = require("./ENV_KEYS");

const CryptoJS = require("crypto-js");
const secretEncryptToken = ENV_KEYS.SECRET_ENCRYPT_TOKEN_KEY;

const encryptDataCrypt = (value) => {
  const encryptData = CryptoJS.AES.encrypt(
    value,
    secretEncryptToken
  ).toString();

  return encryptData;
};

const decryptDataCrypt = (value) => {
  const decryptData = JSON.parse(
    CryptoJS.AES.decrypt(value, secretEncryptToken).toString(CryptoJS.enc.Utf8)
  );

  return decryptData;
};

module.exports = { encryptDataCrypt, decryptDataCrypt };
