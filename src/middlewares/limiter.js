const rateLimit = require("express-rate-limit");
const ms = require("ms");
const logger = require("../service/logger");
const { HTTP_TOO_MANY_REQUEST } = require("../service/httpStatusCodes");
const { getReqInfo } = require("./shared");

const apiLimiter = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const remainingTime = +new Date(req.rateLimit.resetTime) - +new Date();
    res.set("Retry-After", Math.ceil(remainingTime / 1000));
    logger.warn(
      JSON.stringify({
        warning: "Too many requests",
        ...getReqInfo(req)
      })
    );

    res.status(HTTP_TOO_MANY_REQUEST).send({
      message: `Too many requests, please try again in ${ms(remainingTime, { long: true })}.`
    });
  }
};

module.exports = {
  apiLimiter: rateLimit(apiLimiter)
};
