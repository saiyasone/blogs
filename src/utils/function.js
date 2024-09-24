const crypto = require("crypto-js");
const path = require("path");

// format string to utf8 for support lao and thai languages
// ກິນແມວ => ກິນແມວ
const formatNameUTD8 = (str) => {
  return Buffer.from(str, "latin1").toString("utf8");
};

// get file extension such as
// aa.png, bb.jpg, cc.pptx, etc => .png, .jpg, .pptx etc
const getFileExtension = (file) => {
  const extension = formatNameUTD8(file)?.lastIndexOf(".");
  if (extension !== -1) {
    const fileExtension = formatNameUTD8(file)?.slice(extension);
    return fileExtension;
  }

  return "";
};

const validateImage = (file) => {
  const allowedFileTypes = /jpeg|jpg|png/;

  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return true;
  }

  return false;
};

// Random QR Code number
const getRandomNewName = () => {
  const newName = Math.floor(1111111 + Math.random() * 9999999);
  return String(newName);
};

const getRandomQRCode = () => {
  const qrcode = Math.floor(11111 + Math.random() * 99999);
  return String(qrcode);
};

// random newName for upload files
// aa.png => aa-125923.png
const randomFileNewName = (file) => {
  const fileName = formatNameUTD8(file.originalname);
  const fileExtension = getFileExtension(file.originalname);
  const newExtension = fileName.substring(0, fileName.lastIndexOf("."));
  const str = newExtension + "-" + getRandomNewName() + fileExtension;

  return str;
};

const encodeShortURL = () => {
  const shortUrl = crypto
    .randomBytes(6)
    .toString("base64")
    .replace(/\//g, "_")
    .replace(/\+/g, "-");

  return shortUrl;
};

module.exports = {
  formatNameUTD8,
  getFileExtension,
  randomFileNewName,
  getRandomNewName,
  getRandomQRCode,
  encodeShortURL,
  validateImage,
};
