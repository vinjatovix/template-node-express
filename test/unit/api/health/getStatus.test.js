const httpRequest = require("../../../fixtures/httpRequest")();

describe("GET /health", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return 200 and health data", async () => {
    const { status, body } = await httpRequest("GET", "/api/v1/health/status");

    expect(status).toBe(200);
    expect(body).toMatchObject({
      status: "OK",
      message: "The service is up and running.",
      lifeTime: expect.any(Number),
      userIp: expect.any(String)
    });
  });

  it("should return 504 if the request takes longer than 30 seconds", async () => {
    const { status, body } = await httpRequest("GET", "/api/v1/health/status?delay=31");

    expect(status).toBe(504);
    expect(body).toMatchObject({
      message: "Response timeout"
    });
  }, 35000);
});
