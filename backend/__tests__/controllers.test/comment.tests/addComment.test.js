const commentController = require("../../../controllers/comment.controller");
const commentRepository = require("../../../repository/commentRepository");
const db = require('../../../connection');

jest.mock('../../../connection');
jest.mock("../../../repository/commentRepository");

describe("Comment Controller - Add Comment", () => {

    let req, res;
    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            params: {},
            body: {},
            user: { userId: 1 }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it("should return 201 to create comment in posts", async () => {
        req.params = { id: 1 }
        req.body = { body: "ระเบิด discord ให้หน่อย" };
        req.user = { userId: 1 }
        commentRepository.addComment.mockResolvedValue({ affectedRows: 1 });

        await commentController.addComment(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "เพิ่มคอมเม้นในโพสแล้ว"
        });
    })

    it("should return 404 not found post id", async () => {
        req.params = { id: "" }
        req.body = { body: "คาเมนไรเดอร์ดีดีดีดีเคด" };
        req.user = { userId: 1 }

        commentRepository.addComment.mockResolvedValue({ affectedRows: 0 });
        await commentController.addComment(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "ไม่เจอ id โพสต์นี้"
        });
    })

    it("should return 400 not found user id active to delete post ", async () => {
        req.params = { id: 1 }
        req.body = { body: "คาเมนไรเดอร์ดีดีดีดีเคด" };
        req.user = undefined

        commentRepository.addComment.mockResolvedValue({ affectedRows: 0 });
        await commentController.addComment(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "ไม่พบ user นี้"
        });
    })

    it("should return 400 not information body", async () => {
        req.params = { id: 1 }
        req.body = { body: "" }
        req.user = {userId: 1}

        await commentController.addComment(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "กรุณากรอก comment"
        });
    })

})