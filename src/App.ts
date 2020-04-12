import fastify, {FastifyInstance} from "fastify";
import fastifyEnv from "fastify-env";
import {IncomingMessage, Server, ServerResponse} from "http";
import {Config, schema} from "./config";

export class App {

    public readonly instance: FastifyInstance<Server, IncomingMessage, ServerResponse, Config>;

    constructor() {
        this.instance = fastify({
            //TODO: logger
            return503OnClosing: true
        });
        this.registerPlugins();
    }

    public async start(): Promise<void> {
        await this.instance.ready();
        return new Promise((resolve, reject) => {
            this.instance.listen(
                this.instance.config.SERVER_PORT,
                this.instance.config.SERVER_ADDRESS, (err, address) => {
                    if(err) {
                        console.warn("Failed to start server: ", err);
                        reject();
                    }
                    console.log("Server started on " + address);
                    resolve();
                })
        })
    }

    public async stop(): Promise<void> {
        await this.instance.close();
    }

    private registerPlugins(): void {
        this.instance.register(fastifyEnv, {schema});
    }
}