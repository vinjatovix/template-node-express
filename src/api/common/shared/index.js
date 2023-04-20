const { addConflictIdToError } = require("./addConflictIdToError");
const { getOptions } = require("./getOptions");

const toJSON = doc => {
  const convertToJSON = doc => (doc && doc.toJSON ? doc.toJSON() : doc);
  if (Array.isArray(doc)) {
    return doc.map(convertToJSON);
  }
  return convertToJSON(doc);
};

module.exports = {
  getOptions,
  toJSON,
  addConflictIdToError
};
