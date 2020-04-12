import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import {app} from "../index.test";

describe("Health endpoint test", async () => {

    it("Should return OK", () => {
        request(app.server)
            .get("/health")
            .expect(200)
            .end((err, res) => {
                if (err) {
                    expect.fail(err);
                }
            });
    });
});
