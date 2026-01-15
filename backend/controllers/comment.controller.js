const { addComment } = require("../repository/commentRepository");

exports.addComment = async (req, res) => {
  try {
    const {id} = req.params;

    const { body } = req.body;
    const user = req.user;

    if (!id) {
      return res.status(404).json({
        message: "ไม่เจอ id โพสต์นี้"
      })
    }

    if (!user) {
      return res.status(400).json({
        message: "ไม่พบ user นี้"
      })
    }

    if (!body) {
      return res.status(400).json({
        message: "กรุณากรอก comment"
      })
    }

    await addComment(id, user.userId, body);

    return res.status(201).json({
      message: "เพิ่มคอมเม้นในโพสแล้ว",
    });
  } catch (error) {
    return res.status(500).json({ message: "เกิดข้อผิดพลาดใน func [addComment]" });
  }
};
