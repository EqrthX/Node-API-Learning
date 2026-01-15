const postController = require("../../../controllers/post.controller");
const postRepository = require("../../../repository/postRepository");
const db = require('../../../connection');

jest.mock('../../../connection');
jest.mock("../../../repository/postRepository");

describe("Post Controller - Update Post", () => {
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


    it("should return 200 to update mock success", async () => {
        req.params = { postId: 1 };
        req.body = { title: "แอชรี่", content: "ระเบิด discord ให้หน่อย" }

        postRepository.qPostUpdate.mockResolvedValue({ affectedRows: 1 })
        await postController.updatePost(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "แก้ไขโพสแล้ว",
        });
    })

    it("should return 400 to not found user id", async () => {
        req.params = {};
        req.body = { title: "แอชรี่", content: "ระเบิด discord ให้หน่อย" }
        req.user = { userId: 1 };

        postRepository.qPostUpdate.mockResolvedValue({ affectedRows: 0 })
        await postController.updatePost(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "ไม่พบ id โพสต์นี้"
        });
    })

    it("should return 404 to not found post id", async () => {
        req.params = {postId: 9999};
        req.body = { title: "แอชรี่", content: "ระเบิด discord ให้หน่อย" }
        req.user = { userId: 1 };

        postRepository.qPostUpdate.mockResolvedValue({ affectedRows: 0 })
        await postController.updatePost(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "ไม่เจอโพสต์ที่จะอัพเดต"
        });
    })
})