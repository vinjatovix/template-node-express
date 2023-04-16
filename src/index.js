const express = require("express");
const cors = require("cors");
const { apiLimiter, errorHandler, requestMonitor, securityPolicy } = require("./middlewares");
const logger = require("./service/logger");

const { NODE_ENV, HOST, PORT, TRUSTED_PROXIES } = process.env;

const app = express();

app
  .set("strict routing", true)
  .set("x-powered-by", false)
  .set("trust proxy", TRUSTED_PROXIES)
  .use(cors())
  .use(requestMonitor)
  .use(apiLimiter)
  .use(securityPolicy)
  .get("/*", async (_req, _res, next) => {
    try {
      throw { id: "MODEL_NOT_FOUND", replace: { id: "123", modelName: "User" } };
    } catch (error) {
      next(error);
    }
  })
  .use(errorHandler)
  .listen(PORT, () => {
    logger.info(`${NODE_ENV} server is running on ${HOST}:${PORT}.`);
  });
