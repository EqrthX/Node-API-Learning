const express = require("express");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


const router = express.Router();

const userLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access-users.log'), { flags: 'a' });
router.use(morgan('combined', { stream: userLogStream }));

const userController = require("../controllers/user.controller");

router.post("/resgistination", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
