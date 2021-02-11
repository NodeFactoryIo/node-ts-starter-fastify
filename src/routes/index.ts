import {FastifyInstance} from "fastify";

import * as sampleController from "../controllers/sample";

export function registerRoutes(server: FastifyInstance): void {
  server.get(sampleController.get.url, sampleController.get.opts, sampleController.get.handler);
}
