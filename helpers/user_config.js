const bcryptjs = require("bcryptjs");

const saltRounded = 10;

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validateName (first_name, last_name) {
    const pattern = /\d/; // เจอตัวเลข = ผิด
    const errors = [];

    if (pattern.test(first_name)) {
        errors.push("ชื่อห้ามมีตัวเลข");
    }

    if (pattern.test(last_name)) {
        errors.push("นามสกุลห้ามมีตัวเลข");
    }

    return errors;
};


async function hashPassword(plainPassword) {
    try {
        const hash = await bcryptjs.hash(plainPassword, saltRounded);

        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
}

async function comparePassword(plainPassword, storeHash) {
    try {
        const match = await bcryptjs.compare(plainPassword, storeHash);
        return match;
    } catch (error) {
        console.error("Error comparing password:", error);
        throw error;
    }
}

module.exports = { hashPassword, comparePassword, validateEmail, validateName }