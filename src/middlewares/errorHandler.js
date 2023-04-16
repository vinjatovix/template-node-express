const { errorCodes } = require("../services/errorCodes");
const logger = require("../service/logger");
const { HTTP_GATEWAY_TIMEOUT } = require("../service/httpStatusCodes");

const errorHandler = (err, _req, res, _next) => {
  const { status, stack = [], ...data } = err.id ? _getNamedError(err) : _getUnnamedError(err);
  logger.error(`Error caught: ${status} ${data.message} - ${JSON.stringify(stack)}`);

  res.status(status).send(data);
};

const _getNamedError = ({ replace, id, ...extraInfo }) => {
  const { status, ...rest } = errorCodes(replace).find(e => e.id === id);

  return { status, ...rest, ...extraInfo };
};

const _getUnnamedError = ({ status, message, stack, code }) => {
  return {
    status: _getStatus(code, status),
    message: message || "Internal server error",
    ...(stack && { stack })
  };
};

const _getStatus = (code, status) => {
  switch (code) {
    case "ETIMEDOUT":
      return HTTP_GATEWAY_TIMEOUT;
    default:
      return status || 500;
  }
};

module.exports = errorHandler;
