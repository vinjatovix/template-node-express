const getStatus = async (startTime, ip, { responseDelay = 0.025 }) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: "OK",
        message: "The service is up and running.",
        lifeTime: Date.now() - startTime,
        userIp: ip
      });
    }, responseDelay * 1000);
  });

module.exports = {
  getStatus
};
