const axios = require("axios");
const db = require("../connection");
const { randomUUID } = require("crypto");

exports.addComment = async (req, res) => {
  try {

    const { body } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        message: "ไม่พบ user นี้"
      })
    }
    const postId = randomUUID();

    if (!body) {
      return res.status(400).json({
        message: "กรุณากรอก comment"
      })
    }

    await db.query(
      "insert into comments (postId, user_id, name, email, body) values (?, ?, ?, ?, ?)",
      [postId,
        user.userId,
        `${user.firstName} ${user.lastName}`,
        user.email,
        body
      ]
    );

    return res.status(201).json({
      message: "insert comments success",
    });
  } catch (error) {
    return res.status(500).json({ message: "add comment failed" });
  }
};
