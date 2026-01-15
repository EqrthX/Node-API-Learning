const { validateEmail } = require("../../../helpers/user_config");

describe("Module User Config - Validate Mail", () => {

    it("Valid Email Success", () => {
        const validEmails = [
            "test@example.com",
            "user.name@domain.co.th",
            "user+tag@gmail.com",
            "123@xyz.net"
        ];

        validEmails.forEach(email => {
            expect(validateEmail(email)).toBe(true);
        })
    })

    it("Valid Email Not Success", () => {
        const notValidEmails = [
            "test.x.x.example.com",
            "user.nameomain.co.th",
            "user+tag1223gmail.com",
            "123666xyznet"
        ];

        notValidEmails.forEach(email => {
            expect(validateEmail(email)).toBe(false);
        })
    })
})