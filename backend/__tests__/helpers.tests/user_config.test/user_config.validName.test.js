const {validateName} = require("../../../helpers/user_config");

describe("Module User Config - Validate Name", () => {

    it("should return empty array if names are valid", () => {
        const errors = validateName("John", "Doe");
        expect(errors).toEqual([]);
    })

    it("should return ชื่อห้ามมีตัวเลข", () => {
        const name = validateName("AW11", "awdwad")
        expect(name).toContain("ชื่อห้ามมีตัวเลข")
    })

    it("should return นามสกุลห้ามมีตัวเลข", () => {
        const name = validateName("AW", "aw123123123dwad")
        expect(name).toContain("นามสกุลห้ามมีตัวเลข")
    })

})