import { expect } from "chai";

import { logger } from "../../src/services/logger";

import { app } from "./app-setup";

describe("Sample e2e test", function () {
  beforeEach(async function () {
    logger.level = "silent";
  });

  afterEach(async function () {
    logger.level = "silent";
  });

  it("Should successfully query database", async function () {
    const res = await app().instance.inject({
      method: "GET",
      path: "/samples",
    });

    expect(res.json()).not.to.be.undefined;
    expect(res.json()).not.to.be.equal(null);
    expect(res.json()).to.be.deep.equal([]);
  });
});
