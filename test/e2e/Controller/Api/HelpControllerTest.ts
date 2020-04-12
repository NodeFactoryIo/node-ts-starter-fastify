import {expect} from "chai";
import {describe} from "mocha";
import request from "supertest";
import {app} from "../../index.test";

describe("Help endpoint test", async () => {

    it("Assert help is returned", () => {
        request(app.server)
            .get("/api/help")
            .expect(200)
            .end((err, res) => {
                expect(err).not.to.be.an("error", "No error");
                expect(res.body).to.be.deep.equal(
                    {message: "Sorry can't help you"},
                    "Should have returned message",
                );
            });
    });
});
