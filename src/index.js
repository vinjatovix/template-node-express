const express = require("express");
const cors = require("cors");

const { NODE_ENV, HOST, PORT } = process.env;

const app = express();

app.use(cors()).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${NODE_ENV} server is running on ${HOST}:${PORT}.`);
});
