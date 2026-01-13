const {
    hashPassword,
    comparePassword,
    validateEmail,
    validateName
} = require("../helpers/user_config");
const db = require("../connection");
const { generateAccessToken, generateRefreshToken } = require("../helpers/jwt")

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "กรุณากรอกข้อมูลให้ครบ"
            })
        }

        const [rows] = await db.query("select id, username, password, email, first_name, last_name from users where username = ? and is_active = 1", [username]);
        if (rows.length === 0) {
            return res.status(401).json({
                message: "ไม่พบ user นี้"
            })
        }

        const user = rows[0];
        const isMatch = await comparePassword(password, rows[0].password);

        if (!isMatch) {
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }
        
        const payload = { userId: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        const expireAt = new Date();
        expireAt.setDate(expireAt.getDate() + 7);

        await db.query(
            "INSERT INTO user_tokens (user_id, refresh_token, expired_at) VALUES (?, ?, ?)",
            [user.id, refreshToken, expireAt]
        )

        await db.query(
            "update users set is_online = 1 where id = ?", [user.id]
        )

        return res.status(200).json({
            message: "Login สำเร็จ",
            payload,
            accessToken,
            refreshToken
        })

    } catch (error) {
        console.error("❌ log crash:", error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    }
}

exports.registration = async (req, res) => {
    try {

        let { username = "", password = "", passwordCon = "", email = "", first_name = "", last_name = "" } = req.body || {};
        const errors = [];

        // required
        if (!username || !password || !passwordCon || !email || !first_name || !last_name) {
            errors.push("กรุณากรอกข้อมูลให้ครบ");
        }

        // password
        if (password.length < 8) {
            errors.push("รหัสผ่านห้ามน้อยกว่า 8 ตัว");
        }

        if (passwordCon.length < 8) {
            errors.push("ยืนยันรหัสผ่านห้ามน้อยกว่า 8 ตัว");
        }
        
        if (password !== passwordCon) {
            errors.push("รหัสผ่านไม่ตรงกัน");
        }

        // email
        if (typeof email !== "string" || !validateEmail(email)) {
            errors.push("รูปแบบอีเมลไม่ถูกต้อง");
        }

        if (errors.length === 0) {
            const [rows] = await db.query("select id from users where email = ? limit 1", [email]);

            if (rows.length > 0) {
                errors.push("อีเมลนี้ถูกใช้งานแล้ว");
            }
        }

        // name
        const nameErrors = validateName(first_name || "", last_name || "");
        if (nameErrors.length > 0) errors.push(...nameErrors);

        if (errors.length > 0) {
            console.log("❌ validation errors:", errors);
            return res.status(400).json({ errors });
        }

        let hashedPassword = ""
        hashedPassword = await hashPassword(passwordCon);
        
        const sql = "insert into users (username, password, email, first_name, last_name) values (?, ?, ?, ?, ?)";
        const data = [username, hashedPassword, email, first_name, last_name];
        const [result] = await db.query(sql, data);

        return res.status(201).json({ message: "สมัครสมาชิกสำเร็จ", result });

    } catch (error) {
        console.error("❌ registration crash:", error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ" });
    }
};


exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "refresh token required" });
    }

    // 1️⃣ หา user จาก refresh token
    const [rows] = await db.query(
      `SELECT user_id 
       FROM user_tokens 
       WHERE refresh_token = ?
       AND (expired_at IS NULL OR expired_at > NOW())`,
      [refreshToken]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "invalid or expired refresh token" });
    }

    const userId = rows[0].user_id;

    // 2️⃣ set user offline
    await db.query(
      "UPDATE users SET is_online = 0 WHERE id = ?",
      [userId]
    );

    // 3️⃣ ลบ refresh token
    await db.query(
      "DELETE FROM user_tokens WHERE refresh_token = ?",
      [refreshToken]
    );

    return res.json({ message: "logout success" });

  } catch (error) {
    console.error("logout error:", error);
    return res.status(500).json({ message: "logout failed" });
  }
};

