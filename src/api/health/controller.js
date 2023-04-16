const { asyncWrapper } = require("../../services/utils");
const Service = require("./service.js");

const getStatus = asyncWrapper(async (req, res) => {
  const { startTime } = req.app.locals;
  const responseDelay = req.query.delay;
  const data = await Service.getStatus(startTime, req.ip, { responseDelay });

  res.status(200).send(data);
});

module.exports = {
  getStatus
};
