const { default: pino } = require("pino");

const logger = pino({
  level: "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: "pino-pretty", // Note avoid using this in production ...
    options: {
      colorized: true,
    },
  },
});

module.exports = logger;
