import {IncomingMessage, Server, ServerResponse} from "http";
import {Plugin} from "fastify";
import {registerRoutes} from "../../routes";

export const routesPlugin: Plugin<Server, IncomingMessage, ServerResponse, {}> = async function (instance) {
  registerRoutes(instance);
};