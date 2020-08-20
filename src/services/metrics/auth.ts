import {Middleware} from "fastify";
import {Server, IncomingMessage, ServerResponse} from "http";

export const onlyWhitelisted: Middleware<Server, IncomingMessage, ServerResponse> = (
  request: IncomingMessage,
  reply: ServerResponse
) => {
  const whiteList = process.env.GRAFANA_WHITELIST?.split(',');

  if (!whiteList?.includes(request.ip)) {
    // eslint-disable-next-line no-console
    reply.status(401).send("You are not authorized to access metrics.");
  }
}