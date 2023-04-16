const { HTTP_OK } = require("../../../service/httpStatusCodes");
const { getParameters, RESPONSES, getResponse } = require("../../../swagger/shared");
const { statusSchema } = require("./schemas");

const healthTag = {
  name: "Health",
  description: "Health check endpoints."
};

const healthPaths = {
  ["/v1/health/status"]: {
    get: {
      tags: [healthTag.name],
      summary: "Get status of the server.",
      description: "Returns the current status of the server.",
      parameters: [...getParameters(["delay"])],
      responses: {
        [`${HTTP_OK}`]: getResponse("ok", statusSchema),
        ...RESPONSES
      }
    }
  }
};

module.exports = { healthPaths, healthTag };
