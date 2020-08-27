declare module "winston-loki" {

  import TransportStream from "winston-transport";
  import * as logform from 'logform';

  interface LokiTransportOptions {
    host: string;
    interval?: number;
    json?: boolean;
    batching?: boolean;
    clearOnError?: boolean;
    replaceTimestamp?: boolean;
    labels?: object;
    format?: logform.Format;
    gracefulShutdown?: boolean;
  }
  export default class LokiTransport extends TransportStream {
    constructor(options: LokiTransportOptions);
  }
}
