const PARAMS = {
  delay: {
    in: "query",
    name: "delay",
    type: "integer",
    description: "Delay time in seconds."
  }
};

const getParameters = params => params.map(param => PARAMS[param]);

module.exports = { getParameters };
