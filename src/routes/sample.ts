import { FastifyInstance } from "fastify";

import * as SampleController from "../controllers/sample";

// /samples prefix
export async function sampleRoutes(server: FastifyInstance): Promise<void> {
  server.get("/", SampleController.get.opts, SampleController.get.handler);
}
