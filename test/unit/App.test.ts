import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import {app} from "./index.test";

describe("Assert server is running", () => {

    it("should be ok", () => {
        request(app.server)
            .get("/")
            .expect(200)
            .end((err, res) => {
                if (err) {
                    expect.fail(err);
                }
            });
    });

});
