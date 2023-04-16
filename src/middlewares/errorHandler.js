const { errorCodes } = require("../services/errorCodes");
const logger = require("../service/logger");

const errorHandler = (err, _req, res, _next) => {
  const { status, stack = [], ...data } = err.id ? _getNamedError(err) : _getUnnamedError(err);
  logger.error(`Error caught: ${status} ${data.message} - ${JSON.stringify(stack)}`);

  res.status(status).send(data);
};

const _getNamedError = ({ replace, id, ...extraInfo }) => {
  const { status, ...rest } = errorCodes(replace).find(e => e.id === id);

  return { status, ...rest, ...extraInfo };
};

const _getUnnamedError = ({ status, message, stack }) => ({
  status: status || 500,
  message: message || "Internal server error",
  ...(stack && { stack })
});

module.exports = errorHandler;
