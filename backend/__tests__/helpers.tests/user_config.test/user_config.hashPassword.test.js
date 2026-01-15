const {hashPassword} = require("../../../helpers/user_config");

describe("Module User Config - Hash Password", () => {

    it("should return true for hash password", async () => {
        const plainPwd = "password1234";
        const hashedPassword = await hashPassword(plainPwd);

        expect(hashedPassword).not.toBe(plainPwd);
        expect(hashedPassword.length).toBeGreaterThan(20);
    })

    it("should return different hashes for the same password (Salting)", async () => {
        const plainPassword = "password123";
        const hash1 = await hashPassword(plainPassword);
        const hash2 = await hashPassword(plainPassword);

        expect(hash1).not.toBe(hash2);
    });
})
