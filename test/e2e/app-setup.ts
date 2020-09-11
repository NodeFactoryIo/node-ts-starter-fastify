import {App} from "../../src/App";
export const app = new App();

before(async () => {
  await app.start();
});

after(async () => {
  await app.stop("TEST");
});
