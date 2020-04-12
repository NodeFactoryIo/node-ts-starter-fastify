import bodyParser from "body-parser";
import express from "express";
import {Application, Request, Response, Router, RequestHandler} from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";

import config from "./Config/Config";
import {HelpController} from "./Controller/Api/HelpController";
import {createApiRoutes} from "./Routes/Api";
import {Service} from "./Services/interface";
import logger, {morganLogger} from "./Services/Logger";

export class App implements Service {

    public express: Application;
    public server?: http.Server;

    private helpController?: HelpController;

    constructor() {
        this.express = express();
        // add before route middleware's here
        this.express.use(morgan("short", {stream: morganLogger}) as RequestHandler);
        this.express.use(bodyParser.json());
        this.express.use(helmet() as RequestHandler);
        // add after route middleware's here
        this.addInitialRoutes();
    }

    public async start(): Promise<void> {
        try {
            this.server = this.express.listen(config.port);
            logger.info(`Server is listening on ${config.port}`);
            this.initControllers();
            this.addApiRoutes();
        } catch (e) {
            logger.error(`App failed to start. Reason: ${e.message}`);
        }
    }

    public async stop(): Promise<void> {
        logger.info("Server shutting down");
        if (this.server) {
            await this.server.close();
        }
    }

    private initControllers(): void {
        this.helpController = new HelpController();
    }

    private addInitialRoutes(): void {
        const router = Router();
        router.get("/", (req: Request, res: Response) => {
            res.json({
                message: "Welcome stranger!",
            });
        });
        router.get("/health", (req: Request, res: Response) => {
            return res.json({
                status: "OK",
            });
        });
        this.express.use("/", router);
    }

    private addApiRoutes(): void {
        if (!this.helpController) {
            throw new Error("Help Controller not initialized.");
        }

        this.express.use("/api", createApiRoutes(
            this.helpController,
        ));
    }
}
