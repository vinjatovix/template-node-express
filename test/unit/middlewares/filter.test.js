const filterMiddleware = require("../../../src/middlewares/filter");

describe("filterMiddleware", () => {
  it("should add filter options to locals if filter query param is present", async () => {
    const req = {
      query: {
        filter: { name: "!~Ned" }
      },
      locals: {}
    };
    const next = jest.fn();

    filterMiddleware(req, {}, next);

    expect(req.locals.filter).toEqual({
      name: {
        $not: /(?=.*(Ned))/gi
      }
    });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should add empty filter options to locals if filter query param is not present", async () => {
    const req = {
      query: {},
      locals: {}
    };
    const next = jest.fn();

    filterMiddleware(req, {}, next);

    expect(req.locals.filter).toEqual({});
    expect(next).toHaveBeenCalledTimes(1);
  });
});
