const {
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_UNPROCESSABLE_ENTITY
} = require("../../service/httpStatusCodes");

module.exports = {
  valid: code => /^E10[1-9]/.test(code),
  module: "general",
  errors: rep => [
    {
      code: "E101",
      id: "MODEL_NOT_FOUND",
      message: `Document (${rep.id}) does not exist in Model (${rep.modelName})`,
      viewMessage: "The view doesn't exist.",
      viewName: rep.id,
      status: HTTP_NOT_FOUND
    },
    {
      code: "E102",
      id: "BODY_INVALID",
      message: "The request has a wrong format.",
      status: HTTP_BAD_REQUEST
    },
    {
      code: "E103",
      id: "DATA_INVALID",
      message: "The request has a wrong property.",
      errors: rep.errors,
      status: HTTP_UNPROCESSABLE_ENTITY
    }
  ]
};
