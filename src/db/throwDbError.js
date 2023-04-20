const mongoose = require("mongoose");
const { connectDB } = require("./connectDB");
const { dbErrors } = require("./dbErrors");

const throwDbError = (error, info) => {
  if (!mongoose.connection.readyState) {
    connectDB();
  }
  if (error.id) {
    throw error;
  }

  const code = error.code || dbErrors.BAD_REQUEST;
  const message = error.errmsg || error.message || error;
  const mongoInfo = {
    _id: error._id,
    code: error.code,
    driver: error.driver,
    name: error.name
  };
  const newError = new Error();
  newError.id = "MONGO_ERROR";
  newError.replace = { message };
  newError.info = info;
  newError.mongoInfo = mongoInfo;

  if (code === dbErrors.UNAUTHORIZED) {
    newError.id = "MONGO_UNAUTHORIZED";
  }
  if (code === dbErrors.CONFLICT) {
    newError.id = "MONGO_WRITING_ERROR";
  }
  if (code === dbErrors.BAD_REQUEST) {
    newError.id = "MONGO_VALIDATION_ERROR";
  }

  throw newError;
};

module.exports = { throwDbError };
