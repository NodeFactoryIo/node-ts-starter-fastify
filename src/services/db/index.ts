import {Connection, createConnection} from "typeorm";
import {sleep} from "../utils";

export async function getDatabaseConnection(): Promise<Connection> {
  let conn = await createConnection();
  conn = await openConnection(conn);
  await conn.runMigrations({transaction: "all"});
  return conn;
}

async function openConnection(conn: Connection): Promise<Connection> {
  if(conn.isConnected) {
    console.log("Connected to database!");
    return conn;
  }
  try {
    return await conn.connect();
  } catch (e) {
    console.log(e);
    console.log("Retrying to connect to database in 3s...");
    await sleep(3000);
    return openConnection(conn);
  }
}