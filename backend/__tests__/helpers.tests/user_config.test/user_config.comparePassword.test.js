const {comparePassword, hashPassword} = require("../../../helpers/user_config");

describe("Module User Config - Compare Password", () => {

    it("should return true if password matches hash", async () => {
        const plain = "secret123";
        const hash = await hashPassword(plain);

        const isMatch = await comparePassword(plain, hash);
        expect(isMatch).toBe(true);
    })

    it("should return false if password does not match", async () => {
        const plain = "secret123";
        const hash = await hashPassword(plain);

        const isMatch = await comparePassword("wrong_password", hash);
        expect(isMatch).toBe(false);
    });
})
