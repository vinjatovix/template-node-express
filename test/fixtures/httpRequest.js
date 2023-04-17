const request = require("supertest");
const service = require("../../src/service/service");

const httpRequest =
  () =>
  async (method, uri, body = {}, authToken = "allPermissions") => {
    const app = service.listen();

    if (method.toUpperCase() === "GET") {
      return request(app).get(uri).set("Authorization", `Bearer ${authToken}`);
    }
    if (method.toUpperCase() === "POST") {
      return request(app).post(uri).send(body).set("Authorization", `Bearer ${authToken}`);
    }
    if (method.toUpperCase() === "PUT") {
      return request(app).put(uri).send(body).set("Authorization", `Bearer ${authToken}`);
    }
    if (method.toUpperCase() === "PATCH") {
      return request(app).patch(uri).send(body).set("Authorization", `Bearer ${authToken}`);
    }
    if (method.toUpperCase() === "DEL") {
      return request(app).del(uri).set("Authorization", `Bearer ${authToken}`);
    }
  };

module.exports = httpRequest;
