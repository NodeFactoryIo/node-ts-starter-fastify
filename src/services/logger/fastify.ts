import {IncomingMessage} from "http";
import {Stream, Transform} from "stream";

import {FastifyLoggerOptions, FastifyRequest, RawServerDefault} from "fastify";

import {logger} from "./index";

function format(req: FastifyRequest<Record<string, unknown>, RawServerDefault>): {msg: string} {
  return {msg: `${req.ip} -> ${req.hostname}\t${req.method}:${req.url}\tRequestId: ${req.id}`};
}

class FastifyLogger implements FastifyLoggerOptions {

  public readonly stream: Stream;

  public readonly serializers = {
    req: (request: IncomingMessage) => {
      //not sure how to fix this type issue
      return format(request as unknown as FastifyRequest<Record<string, unknown>, RawServerDefault>);
    },
  };

  constructor() {
    this.stream = new Transform({
      objectMode: true,
      transform: this.transform
    });
    this.stream.pipe(logger.child({
      labels: {
        module: "http"
      }

    }));
  }

  private transform = (
    chunk: string, encoding: string, callback: (error?: (Error | null), data?: {level: string; message: string}) => void
  ): void => {
    const log: {
      level: number; msg: string; responseTime: number; reqId: number; req?: {msg: string};
      res?: {statusCode: number}; type?: string; stack?: string;
    } = JSON.parse(chunk);
    if (log.stack) {
      callback(null, {level: "error", message: `RequestId: ${log.reqId} ${log.stack}`});
    } else if (log.req) {
      callback(null, {level: "debug", message: log.req.msg});
    } else if (log.res) {
      callback(
        null,
        {
          level: "debug",
          message: `RequestId: ${log.reqId}\tStatusCode: ${log.res.statusCode}\tResponseTime: ${log.responseTime} ms`
        }
      );
    } else {
      let loggerLevel: string;
      switch (log.level) {
        case 40: loggerLevel = "warn"; break;
        case 50: loggerLevel = "error"; break;
        default: loggerLevel = "info";
      }
      callback(null, {level: loggerLevel, message: log.msg});
    }

  };

}

export const fastifyLogger = new FastifyLogger();
