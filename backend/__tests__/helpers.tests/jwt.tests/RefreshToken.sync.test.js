const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });
const db = require("../../../connection");

const { refreshToken } = require("../../../helpers/jwt");
jest.mock("jsonwebtoken");
jest.mock("../../../connection")

describe("JWT Helper - RefreshToken", () => {

    const originalEnv = process.env;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.resetModules();
        process.env = { ...originalEnv };
        process.env.JWT_REFRESH_SECRET = "refresh-secret-key";
        process.env.JWT_ACCESS_SECRET = "access-secret-key";
        process.env.ACCESS_TOKEN_EXPIRE = "1h";
    });

    afterEach(() => {
        process.env = originalEnv;
    })


    it("should call jwt.sign with correct parameters and return token", async () => {
        const req = {
            body: {
                refreshToken: "valid_refresh_token_123"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        db.query.mockResolvedValue([[{ id: 1, user_id: 1, refresh_token: "valid_refresh_token_123" }]]);
        jwt.verify.mockReturnValue({ userId: 1 });
        jwt.sign.mockReturnValue("refresh token required");
        await refreshToken(req, res);

        expect(res.json).toHaveBeenCalledWith({"accessToken": "refresh token required"})
    })

    it("should return 401 if refreshToken is missing in body", async () => {
        const req = { body: {} }; 0
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };

        await refreshToken(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "refresh token required" });
    });

    it("should return 403 if token does not exist in database", async () => {
        const req = { body: { refreshToken: "unknown_token" } };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };

        db.query.mockResolvedValue([[]]); 

        await refreshToken(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "invalid refresh token" });
    });

    it("should return 403 if jwt verification fails (expired)", async () => {
        const req = { body: { refreshToken: "expired_token" } };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };

        db.query.mockResolvedValue([[{ id: 1, refresh_token: "expired_token" }]]);

        jwt.verify.mockImplementation(() => {
            throw new Error("jwt expired");
        });

        await refreshToken(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: "refresh token expired" });
    });
})