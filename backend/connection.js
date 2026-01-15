const mysql = require("mysql2/promise");

const db = mysql.createPool({
  // ถ้ามีค่าใน env ให้ใช้ค่าจาก env, ถ้าไม่มีให้ใช้ host.docker.internal (สำหรับ docker run), หรือ localhost (สำหรับรันสด)
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "node_test_api",
  port: process.env.DB_PORT || "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: (process.env.DB_HOST === 'localhost' || !process.env.DB_HOST)
    ? undefined
    : { rejectUnauthorized: false }
});

module.exports = db;  