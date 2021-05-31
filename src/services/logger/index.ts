import fs from "fs";

import pinoms, { prettyStream } from "pino-multi-stream";

const streams: pinoms.Streams = [
  {
    level: (process.env.LOG_LEVEL as pinoms.Level) || "debug",
    stream: prettyStream({
      dest: process.stdout,
    }),
  },
];

if (process.env.LOG_FILE) {
  streams.push({
    level: (process.env.LOG_LEVEL as pinoms.Level) || "debug",
    stream: fs.createWriteStream(process.env.LOG_FILE),
  });
}

export const logger = pinoms({ streams });
