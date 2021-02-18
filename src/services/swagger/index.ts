import { FastifyDynamicSwaggerOptions } from "fastify-swagger";

export const SWAGGER_CONFIG: FastifyDynamicSwaggerOptions = {
  mode: "dynamic",
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "API documentation",
      description: "testing the fastify swagger api",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};
