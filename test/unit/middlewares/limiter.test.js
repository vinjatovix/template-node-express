const express = require("express");
const request = require("supertest");
const { apiLimiter, errorHandler } = require("../../../src/middlewares");

const app = express();
app.use(apiLimiter).use(errorHandler);

describe("apiLimiter", () => {
  it("respond with 429", async () => {
    for (let i = 0; i < 100; i++) {
      await request(app).get("/");
    }

    const { status, body } = await request(app).get("/");
    expect(status).toEqual(429);
    expect(body).toMatchObject({
      message: "Too many requests, please try again in 15 minutes."
    });
  });
});
