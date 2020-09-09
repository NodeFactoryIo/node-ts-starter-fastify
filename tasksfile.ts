import {ICLIOptions} from "@pawelgalazka/cli";
import {cli, help, sh, rawArgs} from "tasksfile";

function clean(): void {
  sh("rm -rf node_modules");
  sh("rm -rf build");
}

function lint(): void {
  sh("docker-compose run --rm backend yarn run lint", {async: false, nopipe: true});
}

function npm(): void {
  sh("docker-compose run --rm backend yarn run " + rawArgs().join(" "), {async: false, nopipe: true});
}

function compile(): void {
  sh("docker-compose run --rm backend yarn run build", {async: false, nopipe: true});
}

function build(): void {
  sh("docker-compose down", {async: false, nopipe: true});
  sh("docker-compose -f docker-compose-cleanup.yml down -v", {async: false, nopipe: true});
  sh("docker-compose build", {async: false, nopipe: true});
}

function e2e(): void {
  sh("docker-compose -f docker-compose.e2e.yml up --abort-on-container-exit --exit-code-from backend",
    {async: false, nopipe: true});
}

function unit(): void {
  sh("docker-compose run -e NODE_ENV=test --no-deps --rm backend yarn run test:unit", {async: false, nopipe: true});
}

function test(options: ICLIOptions, type = ""): void {
  if (type === "unit") {
    unit();
  } else if (type === "e2e") {
    e2e();
  } else {
    sh("docker-compose run -e NODE_ENV=test --no-deps --rm backend yarn run test", {async: false, nopipe: true});
  }
}

function dev(): void {
  sh("docker-compose up", {async: false, nopipe: true});
}

help(e2e, "Runs end-to-end tests");
help(unit, "Runs nodejs unit tests");
help(test, "Runs nodejs tests");
help(dev, "Starts application and all dependent services");
help(npm, "Executes yarn script");
help(compile, "Transpiles files to es5");
help(clean, "Removes all build directories and dependencies");
help(lint, "Runs eslint on current project");
help(build, "Builds new docker image");

cli({
  clean,
  lint,
  npm,
  build,
  unit,
  test,
  compile,
  dev,
  e2e,
});
