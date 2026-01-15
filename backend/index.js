const express = require("express");
require("dotenv").config()

const commentRoutes = require("./routes/comment.routes");
const dummyRoutes = require("./routes/dummy.routes");
const userRoutes = require("./routes/user.routes");
const checkRoutes = require("./routes/check.route");
const postRoutes = require("./routes/post.routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/check", checkRoutes);

app.use("/api", userRoutes);
// mount routes
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
