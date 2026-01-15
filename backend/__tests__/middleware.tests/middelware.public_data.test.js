const app = require("../../index");
const request = require("supertest")

describe("Public data route", () => {
    it("should return 200 to public route", async () => {
        const res = await request(app)
            .get("/api/check/public-data")
        
        expect(res.status).toBe(200);

    })
})