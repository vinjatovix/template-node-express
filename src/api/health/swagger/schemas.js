const m2s = require("mongoose-to-swagger");
const { Status } = require("../../../models/Status");

const statusSchema = m2s(Status, {
  omitFields: ["_id"]
});

module.exports = {
  statusSchema: {
    ...statusSchema,
    example: {
      status: "OK",
      message: "The service is up and running.",
      lifeTime: 489513,
      userIp: "219.31.79.22"
    }
  }
};
