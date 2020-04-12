import {after, before} from "mocha";
import {App} from "../../src/App";
import logger from "../../src/Services/Logger";

export const app: App = new App();

before(async () => {
    logger.silent = true;
    await app.start();
});

after(async () => {
    await app.stop();
    logger.silent = false;
});
