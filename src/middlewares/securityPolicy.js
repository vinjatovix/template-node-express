const crypto = require("crypto");
const helmet = require("helmet");

const securityPolicy = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", `'nonce-${crypto.randomBytes(16).toString("hex")}'`],
      styleSrc: ["'self'", `'nonce-${crypto.randomBytes(16).toString("hex")}'`],
      imgSrc: ["'self'"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"]
    }
  }
});

module.exports = securityPolicy;
