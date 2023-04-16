const router = require("express").Router;
const healthRouter = router();
const paths = router();
const { getStatus } = require("./controller");

healthRouter.use("/health", paths);
paths.get("/status", getStatus);

module.exports = { healthRouter };
