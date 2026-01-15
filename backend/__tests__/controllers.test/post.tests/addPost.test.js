const postController = require("../../../controllers/post.controller");
const postRepository = require("../../../repository/postRepository");
const db = require('../../../connection');

jest.mock('../../../connection');
jest.mock("../../../repository/postRepository");

describe("Post Controller - Add Post", () => {
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

    it("should return 201 to create post", async () => {
        // const mockPosts = [{ id: 1, title: "WWWWWWWWWWWWWW", content: "อะไรวะ" }]

        req.body = { title: "New Post", content: "New Content" };
        postRepository.qInsertPost.mockResolvedValue({ affectedRows: 1 });

        await postController.createPost(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "โพสเรียบร้อย!"
        });
    })

    it("should return 400 error to post not information field", async () => {
        req.body = { title: "", content: "" };

        await postController.createPost(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "กรุณากรอกข้อมูลให้ครบ"
        });
    })

    it("should return 400 error to post affectedRows === 0", async () => {
        req.body = { title: "T", content: "C" };
        postRepository.qInsertPost.mockResolvedValue({ affectedRows: 0 });
        await postController.createPost(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "เกิดข้อผิดพลาดในการโพส"
        });
    })
})
