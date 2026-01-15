const express = require("express");

const fs = require('fs');
const path = require('path');
require("dotenv").config({path : path.join(__dirname, "../.env")})

if (!fs.existsSync(path.join(__dirname, 'logs'))) {
    fs.mkdirSync(path.join(__dirname, 'logs'));
}

const commentRoutes = require("./routes/comment.routes");
const dummyRoutes = require("./routes/dummy.routes");
const userRoutes = require("./routes/user.routes");
const checkRoutes = require("./routes/check.route");
const postRoutes = require("./routes/post.routes");

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Backend API is Running on Vercel! 🚀');
});
app.use(express.json());


app.use("/api/check", checkRoutes);
app.use("/api", userRoutes);

app.use("/api", postRoutes);
app.use("/api", dummyRoutes);
app.use("/api", commentRoutes);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express API listening at http://localhost:${port}`);
    });
}

// ต้อง export app ออกไป เพื่อให้ไฟล์ Test เอาไปใช้ได้ (Supertest ต้องการตัวนี้)
module.exports = app;
