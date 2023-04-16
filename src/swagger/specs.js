const { healthPaths, healthTag } = require("../api/health/swagger");
const { statusSchema } = require("../api/health/swagger/schemas");

const { NODE_ENV, HOST, PORT } = process.env;

const tags = [healthTag];

const paths = { ...healthPaths };

const components = { schemas: { Status: statusSchema } };

const server = NODE_ENV === "production" ? `https://${HOST}/api` : `http://${HOST}:${PORT}/api`;

module.exports = {
  specs: {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "template-api",
        description: "Template API",
        version: "1.0.0"
      },
      servers: [{ url: server }],
      tags,
      paths,
      components
    },
    basePath: "/api",
    apis: ["./src/api/**/*.js"]
  }
};
