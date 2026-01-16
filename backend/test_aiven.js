// test_db.js
const fs = require('fs');
const path = require('path');
require("dotenv").config({path : path.join(__dirname, "../.env")})
const db = require('./connection'); // เรียกไฟล์ connection ของคุณ

async function testConnection() {
  try {
    console.log("⏳ กำลังพยายามเชื่อมต่อ Aiven...");
    const connection = await db.getConnection();
    console.log("✅ เชื่อมต่อ Aiven สำเร็จ!");
    
    // ลองยิง Query ง่ายๆ เช็คเวลา server
    const [rows] = await connection.query('SELECT NOW() as now');
    console.log("🕒 เวลาจาก Server:", rows[0].now);
    
    connection.release(); // คืน connection
    process.exit(0);
  } catch (err) {
    console.error("❌ เชื่อมต่อล้มเหลว:", err.message);
    process.exit(1);
  }
}

testConnection();