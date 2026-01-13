const db = require("../connection");

exports.posts = async(req ,res ) => {
    try {
        const [rows] = await db.query("select user_id, title, content from posts");

        return res.status(200).json({
            message: "แสดง post ทั้งหมด",
            data: rows
        })
    } catch (error) {
        return res.status(500).json({
            message: "เกิดข้อผิดพลาด [posts]: " + error
        })
    }
}

exports.createPost = async (req, res) => {
  try {
    const {title, content} = req.body;
    const userId = req.user.userId;

    if(!title || !content) {
      return res.status(400).json({
        message: "กรุณากรอกข้อมูลให้ครบ"
      })
    }

    await db.query("insert into posts (user_id, title, content) values (?, ?, ?)", [userId, title, content]);

    return res.status(201).json({
      message:"โพสเรียบร้อย!"
    })
  } catch (error) {
    return res.status(500).json({
      message:"เกิดข้อผิดพลาด [create post] :" + error
    })
  }
}

exports.updatePost = async (req, res) => {
    try {
        const {postId} = req.params;
        const {title, content} = req.body;
        const userId = req.user.userId;

        if(!postId || isNaN(postId)) {
            return res.status(400).json({
                message: "invalid post id"
            })
        }

        const [rows] = await db.query(
            "update posts set title = ?, content = ? where id = ? and user_id = ?",
            [title, content, postId, userId]
        )

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: "post not found or no permission"
            })
        }

        return res.status(200).json({
            message: "แก้ไขโพสแล้ว",
            rows
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "เกิดข้อผิดพลาด [update post]: " + error
        })
    }
}

exports.deletePost = async(req ,res) => {
    try {
        const {postId} = req.params;
        const userId = req.user.userId;

        if(!postId || isNaN(postId)) {
            return res.status(400).json({
                message: "invalid post id"
            })
        }

        const [result] = await db.query("delete from posts where id = ? and user_id = ?", [postId, userId])

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "post not found or no permission"
            });
        }
        return res.status(200).json({
            message: "ลบ post เรียบร้อย"
        })
    } catch (error) {
        return res.status(500).json({
            message: "เกิดข้อผิดพลาด [delete post]: "+ error
        })
    }
}