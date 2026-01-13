const mysql = require("mysql2/promise");

const db = mysql.createPool({
  // ถ้ามีค่าใน env ให้ใช้ค่าจาก env, ถ้าไม่มีให้ใช้ host.docker.internal (สำหรับ docker run), หรือ localhost (สำหรับรันสด)
  host: process.env.DB_HOST || "host.docker.internal", 
  user: process.env.DB_USER || "dev_user",
  password: process.env.DB_PASSWORD || "password1234",
  database: process.env.DB_NAME || "node_test_api",
});

module.exports = db;  