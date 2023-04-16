const express = require("express");
const cors = require("cors");
const timeout = require("connect-timeout");
const { apiLimiter, errorHandler, requestMonitor, securityPolicy } = require("./middlewares");
const swagger = require("./swagger/router");
const v1 = require("./api/router");
const logger = require("./service/logger");
const { NODE_ENV, HOST, PORT, TRUSTED_PROXIES } = process.env;

const app = express();
app.locals.startTime = Date.now();

const defaultResponse = (_req, res) => {
  res.status(404).send({ message: "Not Found" });
};

app
  .set("x-powered-by", false)
  .set("trust proxy", TRUSTED_PROXIES)
  .use(cors())
  .use(requestMonitor)
  .use(apiLimiter)
  .use(securityPolicy)
  .use(timeout(30000))
  .use(swagger)
  .use(v1)
  .get("/*", defaultResponse)
  .use(errorHandler)
  .listen(PORT, () => {
    logger.info(`${NODE_ENV} server is running on ${HOST}:${PORT}.`);
  });
