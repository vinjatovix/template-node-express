require("dotenv").config();
const logger = require("./src/service/logger");
const service = require("./src/service/service");

const { PORT, HOST, NODE_ENV } = process.env;

service.listen(PORT, () => {
  logger.info(`${NODE_ENV} server is running on ${HOST}:${PORT}.`);
});
