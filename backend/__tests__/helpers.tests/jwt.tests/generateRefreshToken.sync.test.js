const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });

const { generateRefreshToken } = require("../../../helpers/jwt");
jest.mock("jsonwebtoken");

describe("JWT Helper - generateRefreshToken", () => {

    const originalEnv = process.env;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.resetModules();
        process.env = { ...originalEnv };
        process.env.JWT_REFRESH_SECRET = "test-secret-key";
        process.env.REFRESH_TOKEN_EXPIRE = "7d";
    });

    afterEach(() => {
        process.env = originalEnv;
    })


    it("should call jwt.sign with correct parameters and return token", () => {
        const payload = { userId: 1, role: "admin" };
        const mockToken = "fake_refresh_token_123";

        jwt.sign.mockReturnValue(mockToken);

        const result = generateRefreshToken(payload);
        expect(result).toBe(mockToken);
        expect(jwt.sign).toHaveBeenCalledTimes(1);
        expect(jwt.sign).toHaveBeenCalledWith(
            payload,
            "test-secret-key",
            { expiresIn: "7d" }
        );
    })
})