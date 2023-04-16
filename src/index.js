const express = require("express");
const cors = require("cors");
const { requestMonitor } = require("./middlewares");
const logger = require("./service/logger");

const { NODE_ENV, HOST, PORT } = process.env;

const app = express();

app
  .use(cors())
  .use(requestMonitor)
  .listen(PORT, () => {
    logger.info(`${NODE_ENV} server is running on ${HOST}:${PORT}.`);
  });
