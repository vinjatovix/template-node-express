const m2s = require("mongoose-to-swagger");
const { Status } = require("../../../models/Status");
const TestUser = require("../../../models/TestUser");

const statusSchema = m2s(Status, {
  omitFields: ["_id"]
});

const testUserSchema = m2s(TestUser);

module.exports = {
  statusSchema: {
    ...statusSchema,
    example: {
      status: "OK",
      message: "The service is up and running.",
      lifeTime: 489513,
      userIp: "219.31.79.22"
    }
  },
  testUserSchema
};
