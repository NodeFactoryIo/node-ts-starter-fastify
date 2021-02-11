import {Logger as WinstonLogger} from "@nodefactory/winston";
import {Logger} from "typeorm";

import {logger} from "./index";

export class TypeOrmLogger implements Logger {

  private readonly logger: WinstonLogger;

  constructor() {
    this.logger = logger.child({label: "database"});
  }

  log(level: "log" | "info" | "warn", message: unknown): void {
    this.logger.info(message as string);
  }

  logMigration(message: string): void {
    this.logger.debug(message);
  }

  logQuery(query: string, parameters?: unknown[]): void {
    this.logger.debug(query, {parameters});
  }

  logQueryError(error: string, query: string, parameters?: unknown[]): void {
    this.logger.error(error, {query, parameters});
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]): void {
    this.logger.warn(query, {time, parameters});
  }

  logSchemaBuild(message: string): void {
    this.logger.debug(message);
  }
}
