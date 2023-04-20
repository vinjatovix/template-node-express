const {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_GATEWAY_TIMEOUT,
  HTTP_SERVICE_UNAVAILABLE,
  HTTP_UNAUTHORIZED
} = require("../../service/httpStatusCodes");

const getResponse = (title, swaggerSchema) => {
  const description = title === "ok" ? "Successful response." : title;
  const defaultSchema = {
    title: "Default response",
    properties: {
      message: {
        type: "string",
        example: description
      }
    }
  };

  return {
    description,
    content: {
      ["application/json"]: { schema: swaggerSchema || defaultSchema }
    }
  };
};

const RESPONSES = {
  [`${HTTP_UNAUTHORIZED}`]: getResponse("Unauthorized."),
  [`${HTTP_INTERNAL_SERVER_ERROR}`]: getResponse("Internal server error."),
  [`${HTTP_SERVICE_UNAVAILABLE}`]: getResponse("Service unavailable."),
  [`${HTTP_GATEWAY_TIMEOUT}`]: getResponse("Response timeout")
};

module.exports = { RESPONSES, getResponse };
