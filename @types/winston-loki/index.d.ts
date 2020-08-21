import * as Transport from "winston-transport";

declare module "winston-loki" {

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

    export class LokiTransport extends Transport {
        constructor(options: LokiTransportOptions);
    }
}

