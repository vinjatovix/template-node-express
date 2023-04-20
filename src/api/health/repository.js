const Model = require("../../models/TestUser");
const CommonRepository = require("../common/repository");

const findByQuery = (query, options = {}) => CommonRepository.findByQuery(Model, query, options);

module.exports = {
  findByQuery
};
