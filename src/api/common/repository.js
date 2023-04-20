const { throwDbError } = require("../../db");
const { toJSON, getOptions } = require("./shared");

const findByQuery = (Model, query, options = {}) => {
  const { select, session, populate, sort, lean, json, limit, skip } = getOptions(options);

  return Model.find(query)
    .select(select)
    .populate(populate)
    .sort(sort || "-metadata.updatedAt")
    .limit(limit)
    .skip(skip)
    .lean(lean)
    .session(session)
    .then(doc => (json ? toJSON(doc) : doc))
    .catch(throwDbError);
};

module.exports = {
  findByQuery
};
