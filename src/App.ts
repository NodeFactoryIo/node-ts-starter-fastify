import fastify, {FastifyInstance} from "fastify";
import fastifyEnv from "fastify-env";
import {IncomingMessage, Server, ServerResponse} from "http";
import {Config, schema} from "./config";
import fastifyCompress from "fastify-compress";
import fastifyCors from "fastify-cors";
import formBodyPlugin from "fastify-formbody";
import fastifyHelmet from "fastify-helmet";
import fastifyRateLimit from "fastify-rate-limit";
import fastifySensible from "fastify-sensible";
import fastifySwagger from "fastify-swagger";
import {swaggerConfiguration} from "./services/swagger";
import fastifyBlipp from "fastify-blipp";
import fastifyHealthCheck from "fastify-healthcheck";
import {Connection} from "typeorm";
import {getDatabaseConnection} from "./services/db";
import {routesPlugin} from "./services/plugins/routes";

export class App {

  public readonly instance: FastifyInstance<Server, IncomingMessage, ServerResponse, Config>;

  constructor() {
    this.instance = fastify({
      //TODO: logger
      return503OnClosing: true
    }) as FastifyInstance<Server, IncomingMessage, ServerResponse, Config>;
    this.registerPlugins();
  }

  public async start(): Promise<void> {
    this.instance.decorate("db", await getDatabaseConnection());
    await this.instance.ready();
    this.instance.blipp();
    return new Promise((resolve, reject) => {
      this.instance.listen(
        this.instance.config.SERVER_PORT,
        this.instance.config.SERVER_ADDRESS, (err, address) => {
          if(err) {
            console.warn("Failed to start server: ", err);
            reject();
          }
          console.log("Server started on " + address);
          resolve();
        });
    });
  }

  public async stop(): Promise<void> {
    await this.instance.close();
  }

  private registerPlugins(): void {
    this.instance.register(fastifyEnv, {schema});
    this.instance.register(fastifyCompress, {global: true, encodings: ["gzip", "deflate"]});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.instance.register(fastifyCors as any, {origin: process.env.CORS_ORIGIN || true});
    this.instance.register(formBodyPlugin);
    this.instance.register(fastifyHelmet);
    this.instance.register(fastifyRateLimit, {  max: process.env.MAX_REQ_PER_MIN || 100, timeWindow: '1 minute'});
    this.instance.register(fastifySensible);
    this.instance.register(fastifySwagger, swaggerConfiguration);
    this.instance.register(fastifyBlipp);
    this.instance.register(fastifyHealthCheck, {
      healthcheckUrl: "/health",
      underPressureOptions: {
        healthCheckInterval: 5000,
        healthCheck: async() => {
          return true;
        }
      }
    });
    this.instance.register(routesPlugin);
  }
}

declare module "fastify" {

  interface FastifyInstance<HttpServer, HttpRequest, HttpResponse, Config = {}> {
    config: Config;
    db: Connection;
  }
}