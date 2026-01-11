const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const {authMiddleware} = require("../middlewares/auth.middleware")

router.use(authMiddleware)
router.post("/addComment", commentController.addComment);

module.exports = router;
