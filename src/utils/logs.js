const logger = require("../configs/logger");
const moment = require("moment");

module.exports = {
  loginLog: (data) => {
    logger.info({
      datetime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
      data,
    });
  },
  logSuccess: (data, action) => {
    logger.info({
      action,
      datetime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
      data,
    });
  },

  logError: (err, action) => {
    logger.error({
      err,
      action,
      datetime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
    });
  },
};
