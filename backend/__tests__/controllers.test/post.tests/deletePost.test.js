const postController = require("../../../controllers/post.controller");
const postRepository = require("../../../repository/postRepository");
const db = require('../../../connection');

jest.mock('../../../connection');
jest.mock("../../../repository/postRepository");

describe("Post Controller - Delete Post", () => {

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

    it("should return 200 success to delete", async () => {
        req.params = {postId: 1}
        req.user = { userId: 1 };
        postRepository.qPostDelete.mockResolvedValue({ affectedRows: 1 })
        await postController.deletePost(req, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "ลบ post เรียบร้อย",
        });
    })

    it("should return 400 not found post id to delete", async () => {
        req.params = {postId: "ssss"}
        req.user = { userId: 1 };

        await postController.deletePost(req, res)

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "ไม่พบ id โพสต์นี้",
        });
    })

    it("should return 404 not found post id to delete", async () => {
        req.params = {postId: "9999999"}
        req.user = { userId: 1 };

        postRepository.qPostDelete.mockResolvedValue({ affectedRows: 0 })
        await postController.deletePost(req, res)

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "ไม่เจอโพสต์ที่จะลบ",
        });
    })
})