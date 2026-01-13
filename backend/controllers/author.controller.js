const db = require("../connection");

exports.addAuthor = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const userId = req.user.userId;
    
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const sql = "INSERT INTO authors (user_id, title, completed) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [userId, title, completed]);

    return res.status(201).json({
      message: "add title",
      insertId: result.insertId
    });
  } catch (error) {
    return res.status(500).json({ message: "insert data failed!" });
  }
};

exports.updateTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const sql = "UPDATE authors SET title = ? WHERE id = ?";
    const [result] = await db.query(sql, [title, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "not found id" });
    }

    return res.status(200).json({ message: "update title" });
  } catch (error) {
    return res.status(500).json({ message: "update data failed!" });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM authors WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "not found id" });
    }

    return res.status(200).json({ message: "delete title" });
  } catch (error) {
    return res.status(500).json({ message: "delete failed!" });
  }
};
