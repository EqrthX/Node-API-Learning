const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const {authMiddleware} = require("../middlewares/auth.middleware")

router.use(authMiddleware)

router.get("/show-post", postController.posts);
router.post("/create-post", postController.createPost);
router.put("/update-post/:postId", postController.updatePost);
router.delete("/delete-post/:postId", postController.deletePost);

module.exports = router;
