const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middlewares/auth.middleware")


router.get("/public-data", (req, res) => {
    res.json({
        message: "This is public route"
    })
})

router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Protected routes",
        user: req.user
    })
})

module.exports = router;