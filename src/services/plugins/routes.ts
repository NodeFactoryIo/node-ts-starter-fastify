import {IncomingMessage, Server, ServerResponse} from "http";
import {Plugin} from "fastify";
import {registerRoutes} from "../../routes";
import {onlyWhitelisted} from "../metrics/auth";

export const routesPlugin: Plugin<Server, IncomingMessage, ServerResponse, {}> = async function (instance) {
  registerRoutes(instance);
  instance.route({
    url: "/metrics",
    method: 'GET',
    schema: {hide: true},
    preValidation: [
      onlyWhitelisted
    ],
    handler: (_, reply) => {
      reply.type('text/plain').send(instance.metrics.client.register.metrics());
    },
  });
};
