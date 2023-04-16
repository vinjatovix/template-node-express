const router = require("express").Router;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { specs } = require("./specs");

const swagger = router();

swagger.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(specs)));

module.exports = swagger;
