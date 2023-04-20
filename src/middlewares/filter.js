const qs = require("qs");
const { getFilterOptions } = require("../services/filter");
const { asyncWrapper } = require("../services/utils");

const adaptFilter = filter =>
  Object.entries(filter).reduce((acc, [key, value]) => {
    if (typeof value === "object") {
      const adaptedSubFilter = adaptFilter(value);
      for (const [subKey, subValue] of Object.entries(adaptedSubFilter)) {
        acc[`${key}[${subKey}]`] = subValue;
      }
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

const filterMiddleware = asyncWrapper(async (req, res, next) => {
  const qsString = qs.stringify(adaptFilter(req.query));
  const urlSearchParams = new URLSearchParams(qsString);
  const encodedQueryString = urlSearchParams.toString();

  const { filter: filterOption } = qs.parse(encodedQueryString);

  req.locals.filter = filterOption ? getFilterOptions(filterOption) : {};

  await next();
});

module.exports = filterMiddleware;
