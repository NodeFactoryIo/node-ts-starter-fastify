declare module "winston-loki" {

  import TransportStream from "winston-transport";

  interface LokiTransportOptions {
    host: string;
    interval?: number;
    json?: object;
    batching?: boolean;
    clearOnError?: boolean;
    replaceOnError?: boolean;
    replaceTimestamp?: boolean;
    gracefulShutdown?: boolean;

  }

  export class LokiTransport extends TransportStream {
    constructor(options: LokiTransportOptions);
  }
}

