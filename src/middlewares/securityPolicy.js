const helmet = require("helmet");

const securityPolicy = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apis.google.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "https://*.amazonaws.com", "https://*.googleapis.com", "data:"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      connectSrc: ["'self'", "https://template-node-express-production.up.railway.app"]
    }
  }
});

module.exports = securityPolicy;
