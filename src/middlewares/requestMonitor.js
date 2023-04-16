const logger = require("../service/logger");

const requestMonitor = (req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = requestMonitor;
