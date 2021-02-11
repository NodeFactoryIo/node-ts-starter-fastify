import fastify, {FastifyInstance} from "fastify";
import fastifyCompress from "fastify-compress";
import fastifyCors from "fastify-cors";
import fastifyEnv from "fastify-env";
import fastifyFormBody from "fastify-formbody";
import fastifyHealthCheck from "fastify-healthcheck";
import {fastifyHelmet} from "fastify-helmet";
import fastifyMetrics from "fastify-metrics";
import fastifyRateLimit from "fastify-rate-limit";
import fastifySensible from "fastify-sensible";
import fastifySwagger from "fastify-swagger";
import {Connection} from "typeorm";

import {config as envPluginConfig} from "./config";
import {getDatabaseConnection} from "./services/db";
import {logger} from "./services/logger";
import {fastifyLogger} from "./services/logger/fastify";
import {routesPlugin} from "./services/plugins/routes";
import {SWAGGER_CONFIG} from "./services/swagger";
export class App {

  public readonly instance: FastifyInstance;

  protected constructor(instance: FastifyInstance) {
    this.instance = instance;
  }

  /**
   * Initializes fastify, env variables and register routes.
   * Rest of plugins, db and port bind are initialized on start method.
   */
  public static async init(): Promise<App> {
    const instance = fastify({
      logger: fastifyLogger,
      return503OnClosing: true
    });
    const app = new App(instance);
    await app.registerPlugins();
    return app;
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
    } catch (e) {
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

  private async registerPlugins(): Promise<void> {
    this.instance.register(fastifyEnv, envPluginConfig);
    await this.instance.after();
    this.instance.register(fastifyCompress, {global: true, encodings: ["gzip", "deflate"]});
    this.instance.register(fastifyCors, {origin: this.instance.config.CORS_ORIGIN});
    this.instance.register(fastifyFormBody);
    this.instance.register(fastifyHelmet);
    this.instance.register(fastifyRateLimit, {max: this.instance.config.MAX_REQ_PER_MIN, timeWindow: '1 minute'});
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
    if (this.instance.config.NODE_ENV !== "test") {
      this.instance.register(fastifyMetrics, {
        blacklist: '/metrics',
        enableDefaultMetrics: true
      });
    }
    this.instance.register(routesPlugin);
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    db: Connection;
  }
}
