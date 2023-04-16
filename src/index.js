const express = require("express");
const cors = require("cors");
const { errorHandler, requestMonitor } = require("./middlewares");
const logger = require("./service/logger");

const { NODE_ENV, HOST, PORT } = process.env;

const app = express();

app
  .use(cors())
  .use(requestMonitor)
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
