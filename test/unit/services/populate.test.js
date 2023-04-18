const { getPopulateOptions } = require("../../../src/services/populate");

describe("Populate Service", () => {
  describe("getPopulateOptions", () => {
    it("should populate by property", () => {
      expect(getPopulateOptions(["book"])).toMatchObject([
        {
          path: "book",
          populate: []
        }
      ]);
    });
  });
});
