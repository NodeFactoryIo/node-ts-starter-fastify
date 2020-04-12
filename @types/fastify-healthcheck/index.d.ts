declare module "fastify-healthcheck" {

    import {IncomingMessage, Server, ServerResponse} from "http";
    import up from "under-pressure"

    declare namespace fastifyHealthCheckNamespace {
        interface FastifyHealthCheckOptions {
            healthcheckUrl?: string;
            healthcheckUrlDisable?: boolean;
            healthcheckUrlAlwaysFail?: boolean;
            underPressureOptions?: up.UnderPressureOptions;
        }
    }

    // eslint-disable-next-line no-redeclare
    declare const fastifyHealthCheck: Plugin<
        Server,
        IncomingMessage,
        ServerResponse,
        fastifyHealthCheckNamespace.FastifyHealthCheckOptions
        >;

    export = fastifyHealthCheck;
}