const router = require("express").Router;
const healthRouter = router();
const paths = router();
const filter = require("../../middlewares/filter");
const { getStatus, getTestUsers } = require("./controller");

healthRouter.use("/health", paths);

paths.get("/status", getStatus).get("/users", filter, getTestUsers);

module.exports = healthRouter;
