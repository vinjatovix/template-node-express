const includeMiddleware = require("../../../src/middlewares/include");
const { getPopulateOptions } = require("../../../src/services/populate");

describe("include middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { query: {}, locals: {} };
    res = {};
    next = jest.fn();
  });

  it("should set populate options in locals when include query param is provided", async () => {
    const include = "book.author,book.editorial";
    req.query.include = include;

    await includeMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.locals.populate).toEqual(getPopulateOptions(include.split(",")));
  });

  it("should set null in locals when include query param is not provided", async () => {
    await includeMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.locals.populate).toBeNull();
  });

  it("should set null in locals when include query param is empty", async () => {
    req.query.include = "";

    await includeMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.locals.populate).toBeNull();
  });
});
