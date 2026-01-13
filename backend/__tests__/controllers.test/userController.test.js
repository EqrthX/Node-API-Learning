// ใช้ import ตามสไตล์ TypeScript
const userController = require('../../controllers/user.controller');
const db = require('../../connection');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// บอก Jest ให้ Mock ไฟล์ connection
jest.mock('../../connection');
jest.mock("jsonwebtoken");


describe("User controller - Login", () => {
    
    // เคลียร์ mock ทุกครั้ง
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should user login success status 200", async () => {
        const plainPassword = "password1234";
        const realHashPassword = await bcrypt.hash(plainPassword, 10);

        // --- ARRANGE ---
        // [แก้จุดที่ 1] เติมข้อมูลใน mockUser ให้ครบ ไม่งั้น Controller จะหาไม่เจอและส่ง undefined กลับมา
        const mockUser = {
            id: 1, 
            username: "TestUser", 
            password: realHashPassword,
            email: "test123@gmail.com", // เพิ่ม
            first_name: "Test",          // เพิ่ม
            last_name: "User"            // เพิ่ม
        };

        const mockPayload = {
            email: "test123@gmail.com",
            firstName: "Test",
            lastName: "User",
            userId: 1
        }

        const reqMockUsers = {body: {username: "TestUser", password: plainPassword}};
        
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        db.query.mockResolvedValue([[mockUser]]);         
        jwt.sign.mockReturnValue("fake_token");

        // --- ACT ---
        await userController.login(reqMockUsers, res);
        
        // --- ASSERT ---
        expect(db.query).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        
        // เช็คว่า Login ผ่านและได้ Token
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            accessToken: "fake_token", 
            message: "Login สำเร็จ", // [แก้จุดที่ 2] แก้คำผิดจาก สำเร็๗ เป็น สำเร็จ
            payload: mockPayload, 
            refreshToken: "fake_token"
        }));
    });

    it("should return 400 user required field username password", async () => {
        //  mock requset response ก่อน
        const req = { body: {username: "Test", password: ""}};
        const res = {
            status: jest.fn().mockReturnThis(), 
            json: jest.fn()
        }

        // หลังจาก mock เสร็จก็จะเรียกใช้ func ใน controller เพื่อ test
        await userController.login(req, res);

        // ให้ตอบกลับว่าถูกไหม
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({message: "กรุณากรอกข้อมูลให้ครบ"});
    });

    it("should return 401 or 404 when user not found", async () => {

        const req = {body: {username: "Test", password: "12312312312"}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        db.query.mockResolvedValue([[]]);     
        
        await userController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({message: "ไม่พบ user นี้"});
    });

    it("should return 401 where password not match", async () => {
        const req = {body: {username: "Test", password: "123"}};
        const res = {
            status : jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockUser = {
            id: 1, 
            username: "TestUser", 
            password: "hashed_real_password_in_db" 
        };

        db.query.mockResolvedValue([[mockUser]]);

        bcrypt.compare = jest.fn().mockResolvedValue(false);

        await userController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({message: "รหัสผ่านไม่ถูกต้อง"})
            

    })
});

describe("User controller - Register", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should user register enter information filled out ", async () => {
        // const req = {body: {username: "wwwww", password: "12333", passwordCon: "123333", email: "", firstName: "", lastName: ""}}
        const req = {body: {}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await userController.registration(req, res);

        expect(res.json).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                errors: expect.arrayContaining([
                    "กรุณากรอกข้อมูลให้ครบ",
                    "รหัสผ่านห้ามน้อยกว่า 8 ตัว",
                    // คุณสามารถเพิ่มคำอื่นที่อยากเช็คด้วยก็ได้ เช่น "รูปแบบอีเมลไม่ถูกต้อง"
                ])
            })
    
        );    
    })
});