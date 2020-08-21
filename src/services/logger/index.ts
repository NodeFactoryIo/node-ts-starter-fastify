import winston from "@nodefactory/winston";
import {LokiTransport} from "winston-loki";
import Transports from "winston-transport";

const format = winston.format.printf(({ level, message, label, timestamp, requestId }) => {
  message = winston.format.colorize({all: false, message: true}).colorize(level, message);
  let log = `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
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
  }),
]

if(process.env.LOKI_LOGGING ?? "") {
  transportsConfig.push(new LokiTransport({
    host: "http://localhost:3100",
  }));
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  
  format: winston.format.json({}),
  defaultMeta: {
    label: "default"
  },
  transports: transportsConfig
});
