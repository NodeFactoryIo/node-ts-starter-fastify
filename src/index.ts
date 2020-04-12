import {App} from "./App";
import nodeCleanup from "node-cleanup"

const app = new App();

nodeCleanup(function () {
    app.stop();
});

app.start();