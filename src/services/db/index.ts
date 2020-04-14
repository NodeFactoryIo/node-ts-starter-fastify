import {Connection, createConnection, getConnectionOptions} from "typeorm";
import {sleep} from "../utils";
import {logger} from "../logger";
import {PostgresConnectionCredentialsOptions} from "typeorm/driver/postgres/PostgresConnectionCredentialsOptions";
import {TypeOrmLogger} from "../logger/typeorm";

export async function getDatabaseConnection(): Promise<Connection> {
  const opts = await getConnectionOptions();
  let conn = await createConnection({
    ...opts,
    logger: new TypeOrmLogger()
  });
  conn = await openConnection(conn);
  await conn.runMigrations({transaction: "all"});
  return conn;
}

async function openConnection(conn: Connection): Promise<Connection> {
  if(conn.isConnected) {
    logger.info(`Connected to database at ${(conn.options as PostgresConnectionCredentialsOptions).url}`);
    return conn;
  }
  try {
    return await conn.connect();
  } catch (e) {
    logger.warn("Failed to connect to database", e);
    logger.info("Retrying to connect to database in 3s...");
    await sleep(3000);
    return openConnection(conn);
  }
}