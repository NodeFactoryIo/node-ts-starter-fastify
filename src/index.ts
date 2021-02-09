import {App} from "./App";
import nodeCleanup from "node-cleanup";

App.init().then((app) => {
  nodeCleanup(function (exitCode, signal) {
    app.stop(signal as string);
    nodeCleanup.uninstall();
    return false;
  });
  
  app.start();
})


