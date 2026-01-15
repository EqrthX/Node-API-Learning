const app = require("../../index");
const request = require("supertest")
const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

describe("Protected Route Accuess", () => {

    it("should return 200 if token is valid", async () => {

        const secret = process.env.JWT_ACCESS_SECRET || "your_test_token_here";
        const mockPayload = {
            "message": "Protected routes",
            "user": {
                "userId": 555,
                "firstName": "tsssestwwwww",
                "lastName": "xxxeeeexxxwwww",
                "email": "user48@gmail.com",
                "iat": 1768357453,
                "exp": 1768359253
            }
        };
        const token = jwt.sign(mockPayload, secret, { expiresIn: '1h' });

        const res = await request(app)
            .get("/api/check/protected")
            .set('Authorization', `Bearer ${token}`)

        if (res.status === 401) {
            console.error("Server Response:", res.body);
        }

        expect(res.status).toBe(200);
    })

    it("should return 401 if no token provided", async () => {
        const res = await request(app)
            .get("/api/check/protected");

        expect(res.status).toBe(401);
    });

    it("should return 401 if invalid authorization format", async () => {
        const res = await request(app)
            .get("/api/check/protected")
            .set('Authorization', 'Bearer invalidtoken123')
        expect(res.status).toBe(401);
    });

});