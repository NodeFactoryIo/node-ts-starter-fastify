import {App} from "./App";
import nodeCleanup from "node-cleanup";

const app = new App();

nodeCleanup(function (exitCode, signal) {
  app.stop(signal as string);
  nodeCleanup.uninstall();
  return false;
});

app.start();
