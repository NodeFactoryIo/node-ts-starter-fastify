import cleanup, {uninstall} from "node-cleanup";
import {App} from "./App";
import database from "./Services/Database";
import logger from "./Services/Logger";

const app = new App();

database.init().then(() => {
    app.start();
});

cleanup( () => {
    logger.info("Shutting down gracefully");
    app.stop();
    uninstall();
    return true;
});
