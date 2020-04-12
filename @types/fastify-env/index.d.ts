declare module "fastify-env" {

    import * as http from "http";

    declare namespace fastifyEnvNamespace {
        interface FastifyEnvOptions {
            confKey?: string;
            schema: object;
            data?: any;
        }
    }

// eslint-disable-next-line no-redeclare
    declare const fastifyEnv: Plugin<
        Server,
        IncomingMessage,
        ServerResponse,
        fastifyEnvNamespace.FastifyEnvOptions
        >;

    declare module "fastify" {
        // eslint-disable-next-line max-len
        interface FastifyInstance<HttpServer = http.Server, HttpRequest = http.IncomingMessage, HttpResponse = http.ServerResponse, Config> {
            config: Config;
        }
    }

    export = fastifyEnv;
}