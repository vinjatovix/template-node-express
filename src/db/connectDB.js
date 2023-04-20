const mongoose = require("mongoose");
const logger = require("../service/logger");

const { DB_USER, DB_PASS, DB_URL, DB_NAME } = process.env;
const password = encodeURIComponent(DB_PASS);

const base = `${DB_USER}:${password}@${DB_URL}/${DB_NAME}`;

const MONGODB_URI = `mongodb+srv://${base}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info({ message: "Connection to database successfully" });
  } catch ({ message }) {
    logger.error({ message });
  }
};

module.exports = { connectDB };
