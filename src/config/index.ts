import { fasitfyEnvOpt } from "fastify-env";

export const config: fasitfyEnvOpt = {
  schema: {
    type: "object",
    properties: {
      SERVER_ADDRESS: {
        type: 'string',
        default: '0.0.0.0'
      },
      SERVER_PORT: {
        type: 'number',
        default: 3000
      },
    }
  },
  env: true
};

declare module 'fastify' {
  interface FastifyInstance {
    config: { 
      SERVER_ADDRESS: string;
      SERVER_PORT: number;
    };
  }
}