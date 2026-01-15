const db = require("../connection");

const qSelectPosts = async () => {

    const sql = "select user_id, title, content from posts";
    const [result] = await db.query(sql);

    return result;
}

const qInsertPost = async (id, title, content) => {
    const sql = "insert into posts (user_id, title, content) values (?, ?, ?)";
    const [result] = await db.query(sql, [id, title, content]);

    return result;
}

const qPostUpdate = async (id, userId, title, content) => {
    
    const sql = "UPDATE posts SET title = ?, content = ? WHERE id = ? and userId = ?"
    const [result] = await db.query(sql, [title, content, id, userId]);
    
    return result.affectedRows;
}

const qPostDelete = async (id, userId) => {
    
    const sql = "delete from posts where id = ? and user_id = ?"
    const [result] = await db.query(sql, [id, userId]);
    
    return result;
}

module.exports = {
    qSelectPosts,
    qInsertPost,
    qPostUpdate,
    qPostDelete
}