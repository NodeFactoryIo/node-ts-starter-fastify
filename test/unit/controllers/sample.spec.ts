import * as assert from "assert";

import {expect} from "chai";
import sinon, {SinonStubbedInstance} from "sinon";
import {factory} from "typeorm-seeding";

import {App} from "../../../src/App";
import {Sample} from "../../../src/entities";
import {SampleRepository} from "../../../src/repositories/sample";
import {logger} from "../../../src/services/logger";
import "../../../src/services/db/factories/sample.factory";

describe("sample controller", function () {

  let app: App;
  let sampleRepositoryStub: SinonStubbedInstance<SampleRepository>;

  beforeEach(async function () {
    logger.silent = true;
    app = await App.init();
    sampleRepositoryStub = sinon.createStubInstance(SampleRepository);
    app.instance.decorate("db", {
      getCustomRepository: () => sampleRepositoryStub
    });
  });

  afterEach(async function () {
    logger.silent = false;
  });

  it("get samples", async function () {
    sampleRepositoryStub.find.resolves([]);
    try {
      const res = await app.instance.inject({
        method: "GET",
        path: "/samples"
      });
      expect(res.json()).to.be.deep.equal([]);
    } catch (e) {
      assert.fail(e);
    }
  });

  it("get filtered samples", async function () {
    const sampleFactory = factory(Sample)();
    const sample = await sampleFactory.make({name: "Test"});
    sampleRepositoryStub.findByName.resolves([
      sample,
    ]);
    try {
      const res = await app.instance.inject({
        method: "GET",
        path: "/samples",
        query: {
          name: "Test"
        }
      });
      expect(res.json()).to.be.deep.equal([sample]);
      expect(sampleRepositoryStub.findByName.withArgs("Test").calledOnce).to.be.true;
    } catch (e) {
      assert.fail(e);
    }
  });

});
