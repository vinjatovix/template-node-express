const { getOptions } = require("../../../../../src/api/common/shared");

describe("getOptions", () => {
  it("should return default options", () => {
    expect(getOptions()).toMatchObject({
      select: null,
      session: null,
      populate: null,
      sort: null,
      lean: true,
      json: true
    });
  });

  it("should return options with clean select", () => {
    expect(
      getOptions({
        select: ["book", "name", "name.lower", "book.author", "book.editorial", "book.author.name"]
      })
    ).toMatchObject({
      select: ["book", "name"]
    });
  });

  it("should set lean to false if populate has populate property", () => {
    const options = getOptions({ populate: { path: "book", populate: "author" } });
    expect(options.lean).toBe(false);
  });

  it("should set lean to false if some populate items have populate property", () => {
    const options = getOptions({
      populate: [
        { path: "book", populate: "author" },
        { path: "user", populate: "friends" },
        { path: "comment" }
      ]
    });
    expect(options.lean).toBe(false);
  });
});
