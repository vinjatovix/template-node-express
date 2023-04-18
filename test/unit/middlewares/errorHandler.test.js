const { errorCodes, errorValidation } = require("../../../src/services/errorCodes");

describe("errorHandler middleware", () => {
  it("Check that error codes have been created correctly.", () => {
    const errors = {
      ids: new Set(),
      codes: new Set()
    };
    // should load all error codes
    expect(errorCodes({}).length > 0).toBeTruthy();

    errorCodes({}).forEach(err => {
      // should add error id to errors.ids
      errors.ids.add(err.id);
      // should add error code to errors.codes
      errors.codes.add(err.code);
      // should verify error code is valid for error module
      expect(errorValidation[err.module](err.code)).toBe(true);
      // should verify error object properties
      expect(err).toMatchObject({
        code: expect.any(String),
        id: expect.any(String),
        message: expect.any(String),
        status: expect.any(Number)
      });
    });
    // should verify errorCodes returned all errors
    expect(errorCodes({})).toHaveLength(errors.ids.size);
    // should verify errorCodes returned all errors
    expect(errorCodes({})).toHaveLength(errors.codes.size);
  });
});
