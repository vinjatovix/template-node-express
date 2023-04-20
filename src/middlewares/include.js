const { getPopulateOptions } = require("../services/populate");
const { asyncWrapper } = require("../services/utils");

const include = asyncWrapper(async (req, res, next) => {
  const { include } = req.query || {};
  req.locals.populate = include ? getPopulateOptions(include.replace(/\s/g, "").split(",")) : null;

  await next();
});

module.exports = include;
