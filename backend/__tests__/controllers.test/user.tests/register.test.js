// --- Imports ---
const userController = require('../../../controllers/user.controller');
const db = require('../../../connection');

jest.mock('../../../connection');

// 2. Mock Helper Functions (user_config)
// ต้อง Mock ให้ตรงกับ path ที่ Controller เรียกใช้
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

const { hashPassword, validateEmail, validateName } = require('../../../helpers/user_config');

describe("POST /registration", () => {

        it("should return 201 when registration is successful", async () => {
            // Arrange
            const req = { 
                body: { 
                    username: "newuser", 
                    password: "password123", 
                    passwordCon: "password123", 
                    email: "new@example.com", 
                    first_name: "New", 
                    last_name: "User" 
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mock Validate ผ่านหมด
            validateEmail.mockReturnValue(true);
            validateName.mockReturnValue([]);
            
            // Mock DB เช็ค Email ไม่ซ้ำ (return empty array)
            db.query.mockResolvedValueOnce([[]]);
            
            // Mock Hash
            hashPassword.mockResolvedValue("hashed_secret");

            // Mock DB Insert สำเร็จ
            db.query.mockResolvedValueOnce([{ insertId: 99 }]);

            // Act
            await userController.registration(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "สมัครสมาชิกสำเร็จ"
            }));
            expect(hashPassword).toHaveBeenCalledWith("password123");
        });

        it("should return 400 with errors array when fields are missing", async () => {
            const req = { body: { username: "onlyUser" } }; // Missing others
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mock functions เพื่อไม่ให้ error ก่อนถึงจุดเช็ค (เผื่อ code run ทะลุ)
            validateName.mockReturnValue([]); 

            await userController.registration(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                errors: expect.arrayContaining(["กรุณากรอกข้อมูลให้ครบ"])
            }));
        });

        it("should return 400 when password is short or mismatch", async () => {
            const req = { 
                body: { 
                    username: "test", 
                    password: "123",        // สั้นไป
                    passwordCon: "123456",  // ไม่ตรง
                    email: "t@t.com", 
                    first_name: "T", 
                    last_name: "U" 
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            validateEmail.mockReturnValue(true);
            validateName.mockReturnValue([]);

            await userController.registration(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                errors: expect.arrayContaining([
                    "รหัสผ่านห้ามน้อยกว่า 8 ตัว",
                    "ยืนยันรหัสผ่านห้ามน้อยกว่า 8 ตัว",
                    "รหัสผ่านไม่ตรงกัน"
                ])
            }));
        });

        it("should return 400 when email already exists", async () => {
            const req = { 
                body: { 
                    username: "user", password: "password123", passwordCon: "password123",
                    email: "duplicate@example.com", first_name: "F", last_name: "L"
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            validateEmail.mockReturnValue(true);
            validateName.mockReturnValue([]);

            // Mock DB เจอ Email ซ้ำ (return array ที่มีข้อมูล)
            db.query.mockResolvedValueOnce([[{ id: 5 }]]); 

            await userController.registration(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                errors: expect.arrayContaining(["อีเมลนี้ถูกใช้งานแล้ว"])
            }));
        });

        it("should return 400 when helpers (validateName/Email) fail", async () => {
            const req = { 
                body: { 
                    username: "u", password: "password123", passwordCon: "password123",
                    email: "bad-email", first_name: "Bad$Name", last_name: "L"
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mock Validations Fail
            validateEmail.mockReturnValue(false);
            validateName.mockReturnValue(["ชื่อห้ามมีอักขระพิเศษ"]);

            await userController.registration(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                errors: expect.arrayContaining([
                    "รูปแบบอีเมลไม่ถูกต้อง",
                    "ชื่อห้ามมีอักขระพิเศษ"
                ])
            }));
        });

        it("should return 500 when database crash during registration", async () => {
            const req = { 
                body: { 
                    username: "u", password: "password123", passwordCon: "password123",
                    email: "ok@ok.com", first_name: "F", last_name: "L"
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            validateEmail.mockReturnValue(true);
            validateName.mockReturnValue([]);
            db.query.mockResolvedValueOnce([[]]); // Email check pass
            hashPassword.mockResolvedValue("hashed");
            
            // Mock Insert Crash
            db.query.mockRejectedValue(new Error("Insert Failed"));

            await userController.registration(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "เกิดข้อผิดพลาดในระบบ" });
        });
    });
