const express = require("express");
const router = express.Router();
const dummyController = require("../controllers/dummy.controller");
const {authMiddleware} = require("../middlewares/auth.middleware")

router.use(authMiddleware)
router.get("/hello", dummyController.hello);
router.get("/dummys", dummyController.getTodos);

module.exports = router;
