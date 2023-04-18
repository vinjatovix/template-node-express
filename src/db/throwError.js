const mongoose = require("mongoose");
const { connectDB } = require("./connectDB");
const { dbErrors } = require("./dbErrors");

const throwError = (error, info) => {
  if (!mongoose.connection.readyState) {
    connectDB();
  }

  const code = error.code || dbErrors.BAD_REQUEST;
  const message = error.errmsg || error.message || error;
  const mongoInfo = {
    _id: error._id,
    code: error.code,
    driver: error.driver,
    name: error.name
  };
  if (code === dbErrors.UNAUTHORIZED) {
    throw { id: "MONGO_UNAUTHORIZED", replace: { message }, info, mongoInfo };
  }
  if (code === dbErrors.CONFLICT) {
    throw { id: "MONGO_WRITING_ERROR", replace: { message }, info, mongoInfo };
  }
  if (code === dbErrors.BAD_REQUEST) {
    throw { id: "MONGO_VALIDATION_ERROR", replace: { message }, info, mongoInfo };
  }
  if (error.id) {
    throw error;
  }
  throw { id: "MONGO_ERROR", replace: { message }, info, mongoInfo };
};

module.exports = { throwError };
