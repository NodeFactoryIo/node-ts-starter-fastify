export * from "./interface";

export const schema = {
  type: 'object',
    properties: {
        SERVER_ADDRESS: {
            type: 'string',
            default: '127.0.0.1'
        },
        SERVER_PORT: {
            type: 'number',
            default: 3000
        },
    }
};