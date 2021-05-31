import { FastifyInstance } from "fastify";

import { sampleRoutes } from "./sample";

export function registerRoutes(server: FastifyInstance): void {
  server.register(sampleRoutes, { prefix: "/samples" });
}
