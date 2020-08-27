import winston from "@nodefactory/winston";
import LokiTransport from "winston-loki";
import Transports from "winston-transport";

const format = winston.format.printf(({ level, message, label, timestamp, requestId }, ...rest) => {
  message = winston.format.colorize({all: false, message: true}).colorize(level, message);
  let log = `${timestamp} [${label}] ${level.toUpperCase()}: ${message} ${rest}`;
  if(requestId) {
    log += " RequestId: " + requestId;
  }
  return log;
});

const transportsConfig: Transports[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.align(),
      format
    )
  })
];

if (process.env.WINSTON_LOKI_URL) {
  transportsConfig.push(new LokiTransport({
    host: process.env.WINSTON_LOKI_URL,
    batching: process.env.WINSTON_LOKI_BATCHING == "true",
    labels: {
      app: process.env.WINSTON_LOKI_APP_NAME ?? "",
    }
  }));
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",

  format: winston.format.json({}),
  defaultMeta: {
    labels: {
      module: "default"
    }
  },
  transports: transportsConfig
});
