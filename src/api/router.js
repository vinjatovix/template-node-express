const router = require("express").Router;
const { healthRouter } = require("./health/router");

const v1 = router();

v1.use("/api/v1/", healthRouter);

module.exports = { v1 };
