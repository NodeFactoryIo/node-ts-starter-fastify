import express from "express";
import {HelpController} from "../Controller/Api/HelpController";

export function createApiRoutes(
    helpController: HelpController,
): express.Router {
    const router = express.Router();

    router.get(
        "/help",
        // validate(schema) // express-validation
        helpController.getHelp.bind(helpController));

    return router;
}
