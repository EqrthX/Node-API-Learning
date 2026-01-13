const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");
const {authMiddleware} = require("../middlewares/auth.middleware")

router.use(authMiddleware)

router.post("/AddAuthor",  authorController.addAuthor);
router.put("/updatetitle/:id",  authorController.updateTitle);
router.delete("/del/:id",  authorController.deleteAuthor);

module.exports = router;
