const express = require("express");
const cors = require("cors");
const timeout = require("connect-timeout");
const { apiLimiter, errorHandler, requestMonitor, securityPolicy } = require("../middlewares");
const swagger = require("../swagger/router");
const v1 = require("../api/router");
const { TRUSTED_PROXIES } = process.env;

const app = express();
app.locals.startTime = Date.now();

const defaultResponse = (_req, res) => {
  res.status(404).send({ message: "Not Found" });
};

const allowedOrigins = [
  "http://localhost:3000",
  "https://template-node-express-production.up.railway.app",
  "https://template-node-express-development.up.railway.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app
  .set("x-powered-by", false)
  .set("trust proxy", TRUSTED_PROXIES)
  .use(cors(corsOptions))
  .use(requestMonitor)
  .use(apiLimiter)
  .use(securityPolicy)
  .use(timeout(30000))
  .use(swagger)
  .use(v1)
  .get("/*", defaultResponse)
  .use(errorHandler);

module.exports = app;
