import {App} from "../../src/App";

let instance: App;

export const app = (): App => instance;

before(async () => {
  instance = await App.init();
  await instance.start();
});

after(async () => {
  await instance.stop("TEST");
});
