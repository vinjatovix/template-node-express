const path = require("path");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const { combine, timestamp, json, colorize, simple } = winston.format;

const PERSISTENT_LOGS = ["error", "warn", "silly"];
const defaultFormat = combine(timestamp(), json());

const _getLogFileName = level => path.resolve(__dirname, "../../logs", `${level}-%DATE%.log`);

const persistenceTransports = PERSISTENT_LOGS.map(
  level =>
    new DailyRotateFile({
      level,
      format: defaultFormat,
      filename: _getLogFileName(level),
      maxSize: "20m",
      maxFiles: "30d"
    })
);

const logger = winston.createLogger({
  level: "debug",
  format: defaultFormat,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: combine(colorize(), simple()),
      handleExceptions: true
    }),
    ...persistenceTransports
  ]
});

module.exports = logger;
