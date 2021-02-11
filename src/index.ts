import nodeCleanup from "node-cleanup";

import {App} from "./App";

App.init().then((app) => {
  nodeCleanup(function (exitCode, signal) {
    app.stop(signal as string);
    nodeCleanup.uninstall();
    return false;
  });

  app.start();
})
