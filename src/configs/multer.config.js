const multer = require("multer");

const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = multerConfig;
