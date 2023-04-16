const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  status: {
    type: String
  },
  message: {
    type: String
  },
  lifeTime: {
    type: Number
  },
  userIp: {
    type: String
  }
});

const Status = mongoose.model("Status", statusSchema);

module.exports = {
  Status
};
