import {Connection, createConnection, getConnectionOptions, ObjectType, getConnection} from "typeorm";
import {sleep} from "../utils";
import {logger} from "../logger";
import {PostgresConnectionCredentialsOptions} from "typeorm/driver/postgres/PostgresConnectionCredentialsOptions";
import {TypeOrmLogger} from "../logger/typeorm";

export async function getDatabaseConnection(): Promise<Connection> {
  let conn: Connection;
  try {
    conn = getConnection();
  } catch{

    conn = await openConnection();
  }
  return conn;
}

async function openConnection(connection?: Connection): Promise<Connection> {
  const conn = connection ?? await createConnection({
    ...(await getConnectionOptions()),
    logger: new TypeOrmLogger()
  });
  if(conn.isConnected) {
    logger.info(`Connected to database at ${getUrl(conn.options as PostgresConnectionCredentialsOptions)}`);
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

export async function getRepository<T>(customRepository: ObjectType<T>): Promise<T> {
  const connection = await getDatabaseConnection();
  return connection.getCustomRepository<T>(customRepository);
}

function getUrl(opts: PostgresConnectionCredentialsOptions): string {
  return (opts.url ?? `${opts.host}:${opts.port}`) + ` (${opts.database})`
}