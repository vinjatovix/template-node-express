const getReqInfo = ({ ip, method, originalUrl, headers, user }) => ({
  ip,
  method,
  url: originalUrl,
  userAgent: headers["user-agent"],
  user
});

module.exports = {
  getReqInfo
};
