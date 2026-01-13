const express = require("express");
require("dotenv").config()

const authorRoutes = require("./routes/author.routes");
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
app.use("/api", authorRoutes);
app.use("/api", commentRoutes);

app.listen(port, () => {
  console.log(`Express API listening at http://localhost:${port}`);
});
