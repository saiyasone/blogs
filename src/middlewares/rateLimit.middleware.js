const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 4,
  message: "Too many requests, please try again later.",
});

module.exports = {
  limiter,
};
