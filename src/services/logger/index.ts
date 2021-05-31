import pino from "pino";

export let logger: pino.Logger;

if (process.env.LOG_FILE) {
  logger = pino({
    level: process.env.LOG_LEVEL || "debug",
  });
} else {
  logger = pino(
    {
      level: process.env.LOG_LEVEL || "debug",
      prettyPrint: true,
    },
    process.stdout
  );
}
