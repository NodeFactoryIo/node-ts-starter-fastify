import {Stream, Transform} from "stream";
import {logger} from "./index";
import {IncomingMessage} from "http";
import {FastifyRequest} from "fastify";

class FastifyLogger {

  public readonly stream: Stream;

  public readonly serializers = {
    req: (request: IncomingMessage&FastifyRequest) => {
      return { msg: `${request.ip} -> ${request.hostname}\t${request.method}:${request.url}\tRequestId: ${request.id}`};
    },
  };

  constructor() {
    this.stream = new Transform({
      objectMode: true,
      transform: this.transform
    });
    this.stream.pipe(logger.child({label: "http"}));
  }

  private transform = (
    chunk: string, encoding: string, callback: (error?: (Error | null), data?: {level: string; message: string}) => void
  ): void =>  {
    const log: {
      level: number; msg: string; responseTime: number; reqId: number; req?: {msg: string}; res?: {statusCode: number};
    } = JSON.parse(chunk);
    if(log.req) {
      callback(null, {level: "debug", message: log.req.msg});
    } else if(log.res) {
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
