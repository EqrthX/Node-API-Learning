const db = require("../connection");

const addComment = async (postId, userId, body) => {
    const sql = "insert into comments (post_id, user_id, body) values (?, ?, ?)";
    const [result] = await db.query(
        sql,
        [postId, userId, body]
    );

    return result;
}

module.exports = {
    addComment
}