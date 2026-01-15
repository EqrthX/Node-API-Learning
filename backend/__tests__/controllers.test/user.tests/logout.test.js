// --- Imports ---
const userController = require('../../../controllers/user.controller');
const db = require('../../../connection');

jest.mock('../../../connection');

jest.mock('../../../helpers/user_config', () => ({
    hashPassword: jest.fn(),
    comparePassword: jest.fn(),
    validateEmail: jest.fn(),
    validateName: jest.fn()
}));

// 3. Mock JWT Helper
jest.mock('../../../helpers/jwt', () => ({
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn()
}));


describe("POST /logout", () => {
        
        it("should return 200 and logout successfully", async () => {
            // Arrange
            const req = { body: { refreshToken: "valid_refresh_token" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // 1. Mock หา Token เจอ
            db.query.mockResolvedValueOnce([[{ user_id: 10 }]]);
            // 2. Mock Update users (is_online = 0)
            db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
            // 3. Mock Delete token
            db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

            // Act
            await userController.logout(req, res);

            // Assert
            expect(res.json).toHaveBeenCalledWith({ message: "logout success" });
            // เช็คว่ามีการเรียก DB ครบ 3 ครั้ง
            expect(db.query).toHaveBeenCalledTimes(3);
        });

        it("should return 400 if refreshToken is missing", async () => {
            const req = { body: {} };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await userController.logout(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "refresh token required" });
        });

        it("should return 401 if refreshToken is invalid or expired", async () => {
            const req = { body: { refreshToken: "expired_token" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mock ไม่เจอ Token ใน DB
            db.query.mockResolvedValueOnce([[]]);

            await userController.logout(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "invalid or expired refresh token" });
        });

        it("should return 500 when database error occurs during logout", async () => {
            const req = { body: { refreshToken: "token" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            db.query.mockRejectedValue(new Error("DB Connection Lost"));

            await userController.logout(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "logout failed" });
        });
    });
