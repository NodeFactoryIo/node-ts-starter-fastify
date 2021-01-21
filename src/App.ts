import fastify, { FastifyInstance } from "fastify";
import fastifyCompress from "fastify-compress";
import fastifyCors from "fastify-cors";
import fastifyEnv from "fastify-env";
import fastifyFormBody from "fastify-formbody";
import { fastifyHelmet } from "fastify-helmet";
import fastifyRateLimit from "fastify-rate-limit";
import fastifySensible from "fastify-sensible";
import fastifySwagger from "fastify-swagger";
import fastifyMetrics from "fastify-metrics";
import fastifyHealthCheck from "fastify-healthcheck";
import { Connection } from "typeorm";
import { config as envPluginConfig } from "./config";
import { getDatabaseConnection } from "./services/db";
import { logger } from "./services/logger";
import { routesPlugin } from "./services/plugins/routes";
import { SWAGGER_CONFIG } from "./services/swagger";
import { fastifyLogger } from "./services/logger/fastify";
export class App {

  public readonly instance: FastifyInstance;

  constructor() {
    this.instance = fastify({
      logger: fastifyLogger,
      return503OnClosing: true
    });
    this.registerPlugins();
  }

  public async start(): Promise<void> {
    try {
      await this.initDb();

      await this.instance.ready();
      logger.info(this.instance.printRoutes());
      return new Promise((resolve, reject) => {
        this.instance.listen(
          this.instance.config.SERVER_PORT,
          this.instance.config.SERVER_ADDRESS, (err) => {
            if (err) {
              logger.error("Failed to start server: ", err);
              reject();
            }
            resolve();
          });
      });
    } catch (error) {
      logger.error(`Error occurred during app startup because of: ${error.stack}`);
      this.stop(undefined);
    }
  }

  public async stop(signal: string | undefined): Promise<void> {
    await this.instance.db.close()
      .catch(error =>
        logger.error(`Error occurred during database closing because: ${error.message}`)
      );
    try {
      await this.instance.close();
    } catch(e) {
      logger.error(`Error occurred during server closing because: ${e.message}`);
    }

    if (signal !== "TEST") {
      process.kill(process.pid, signal);
    }
  }

  private async initDb(): Promise<void> {
    this.instance.decorate("db", await getDatabaseConnection());
    await this.instance.db.runMigrations({transaction: "all"});
  }

  private registerPlugins(): void {
    this.instance.register(fastifyEnv, envPluginConfig);
    this.instance.register(fastifyCompress, {global: true, encodings: ["gzip", "deflate"]});
    this.instance.register(fastifyCors, {origin: process.env.CORS_ORIGIN || true});
    this.instance.register(fastifyFormBody);
    this.instance.register(fastifyHelmet);
    this.instance.register(fastifyRateLimit, {max: parseInt(process.env.MAX_REQ_PER_MIN || "100"), timeWindow: '1 minute'});
    this.instance.register(fastifySensible);
    this.instance.register(fastifySwagger, SWAGGER_CONFIG);
    this.instance.register(fastifyHealthCheck, {
      healthcheckUrl: "/health",
      exposeUptime: true,
      underPressureOptions: {
        healthCheckInterval: 5000,
        healthCheck: async () => {
          return true;
        }
      }
    });
    this.instance.register(fastifyMetrics, {
      blacklist: '/metrics',
      enableDefaultMetrics: true
    });
    this.instance.register(routesPlugin);
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    db: Connection;
  }
}