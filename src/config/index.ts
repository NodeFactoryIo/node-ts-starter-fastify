/* eslint-disable @typescript-eslint/naming-convention */
import { fasitfyEnvOpt } from "fastify-env";

export const config: fasitfyEnvOpt = {
  schema: {
    type: "object",
    properties: {
      NODE_ENV: {
        type: 'string',
        default: 'prod'
      },
      SERVER_ADDRESS: {
        type: 'string',
        default: '0.0.0.0'
      },
      SERVER_PORT: {
        type: 'number',
        default: 3000
      },
      CORS_ORIGIN: {
        type: 'string',
        default: "*"
      },
      MAX_REQ_PER_MIN: {
        type: 'number',
        default: 100
      },
    }
  },
  env: true
};

declare module 'fastify' {
  interface FastifyInstance {
    config: { 
      NODE_ENV: string | "test" | "prod";
      SERVER_ADDRESS: string;
      SERVER_PORT: number;
      CORS_ORIGIN: string;
      MAX_REQ_PER_MIN: number;
    };
  }
}