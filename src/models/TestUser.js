const mongoose = require("mongoose");

const testUserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});

const TestUser = mongoose.model("testUser", testUserSchema);

module.exports = TestUser;
