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

jest.mock('../../../helpers/jwt', () => ({
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn()
}));

const { comparePassword } = require('../../../helpers/user_config');
const { generateAccessToken, generateRefreshToken } = require('../../../helpers/jwt');

describe("User Controller Tests", () => {
        // เคลียร์ Mock ทุกครั้งหลังจบแต่ละ test case
        afterEach(() => {
            jest.clearAllMocks();
        });

        // ==========================================================
        // LOGIN TESTS
        // ==========================================================
        describe("POST /login", () => {
            
            it("should return 200 and tokens when login is successful", async () => {
                // Arrange
                const req = { body: { username: "testuser", password: "password123" } };
                const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

                const mockUser = {
                    id: 1,
                    username: "testuser",
                    password: "hashed_password",
                    email: "test@example.com",
                    first_name: "Test",
                    last_name: "User"
                };

                // Mock DB เจอ User
                db.query.mockResolvedValueOnce([[mockUser]]); 
                // Mock DB Update is_online
                db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); 
                // Mock DB Insert Token
                db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); 

                // Mock Helpers
                comparePassword.mockResolvedValue(true);
                generateAccessToken.mockReturnValue("access_token_123");
                generateRefreshToken.mockReturnValue("refresh_token_123");

                // Act
                await userController.login(req, res);

                // Assert
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                    message: "Login สำเร็จ",
                    accessToken: "access_token_123",
                    refreshToken: "refresh_token_123",
                    payload: expect.objectContaining({ userId: 1 })
                }));
            });

            it("should return 400 when username or password is missing", async () => {
                const req = { body: { username: "" } }; // Missing password
                const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

                await userController.login(req, res);

                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalledWith({ message: "กรุณากรอกข้อมูลให้ครบ" });
            });

            it("should return 401 when user is not found", async () => {
                const req = { body: { username: "unknown", password: "123" } };
                const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

                // Mock DB ไม่เจอ User
                db.query.mockResolvedValueOnce([[]]);

                await userController.login(req, res);

                expect(res.status).toHaveBeenCalledWith(401);
                expect(res.json).toHaveBeenCalledWith({ message: "ไม่พบ user นี้" });
            });

            it("should return 401 when password does not match", async () => {
                const req = { body: { username: "testuser", password: "wrongpassword" } };
                const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

                const mockUser = { id: 1, username: "testuser", password: "hashed_password" };
                db.query.mockResolvedValueOnce([[mockUser]]);
                
                // Mock Password ไม่ตรง
                comparePassword.mockResolvedValue(false);

                await userController.login(req, res);

                expect(res.status).toHaveBeenCalledWith(401);
                expect(res.json).toHaveBeenCalledWith({ message: "รหัสผ่านไม่ถูกต้อง" });
            });

            it("should return 500 when database crashes", async () => {
                const req = { body: { username: "test", password: "123" } };
                const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

                db.query.mockRejectedValue(new Error("DB Error"));

                await userController.login(req, res);

                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.json).toHaveBeenCalledWith({ message: "เกิดข้อผิดพลาดในระบบ" });
            });
        });
    }
)