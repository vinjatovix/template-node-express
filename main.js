require("dotenv").config();
const logger = require("./src/service/logger");
const service = require("./src/service/service");
const { connectDB } = require("./src/db/connectDB");

const { PORT, HOST, NODE_ENV } = process.env;

connectDB();

service.listen(PORT, () => {
  logger.info(`${NODE_ENV} server is running on ${HOST}:${PORT}.`);
});
