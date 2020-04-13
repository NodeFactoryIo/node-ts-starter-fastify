declare module "fastify-env" {

  import {Plugin} from "fastify";
  import {IncomingMessage, Server, ServerResponse} from "http";

  namespace fastifyEnvNamespace {
    interface FastifyEnvOptions {
      confKey?: string;
      schema: object;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?: any;
    }
  }

  const fastifyEnv: Plugin<Server, IncomingMessage, ServerResponse, fastifyEnvNamespace.FastifyEnvOptions>;

  export = fastifyEnv;
}