const db = require("../connection");
const {
    qSelectPosts,
    qInsertPost,
    qPostUpdate,
    qPostDelete }
    = require("../repository/postRepository");

exports.posts = async (req, res) => {
    try {
        const [rows] = await qSelectPosts();

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
        const { title, content } = req.body;
        const userId = req.user.userId;

        if (!title || !content) {
            return res.status(400).json({
                message: "กรุณากรอกข้อมูลให้ครบ"
            })
        }

        const result = await qInsertPost(userId, title, content)

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "เกิดข้อผิดพลาดในการโพส"
            })
        }
        return res.status(201).json({
            message: "โพสเรียบร้อย!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "เกิดข้อผิดพลาด [create post] :" + error
        })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        const userId = req.user.userId;

        if (!postId || isNaN(postId)) {
            return res.status(400).json({
                message: "ไม่พบ id โพสต์นี้"
            })
        }

        const rows = await qPostUpdate(title, content, postId, userId);

        if (rows.affectedRows === 0) {
            return res.status(404).json({
                message: "ไม่เจอโพสต์ที่จะอัพเดต"
            })
        }

        return res.status(200).json({
            message: "แก้ไขโพสแล้ว",
        })

    } catch (error) {
        return res.status(500).json({
            message: "เกิดข้อผิดพลาด [update post]: " + error
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;

        if (!postId || isNaN(postId)) {
            return res.status(400).json({
                message: "ไม่พบ id โพสต์นี้"
            })
        }

        const row = await qPostDelete(postId, userId);

        if (row.affectedRows === 0) {
            return res.status(404).json({
                message: "ไม่เจอโพสต์ที่จะลบ"
            });
        }
        return res.status(200).json({
            message: "ลบ post เรียบร้อย"
        })
    } catch (error) {
        return res.status(500).json({
            message: "เกิดข้อผิดพลาด [delete post]: " + error
        })
    }
}