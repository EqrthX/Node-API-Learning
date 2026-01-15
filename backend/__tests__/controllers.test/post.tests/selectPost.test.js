const postController = require("../../../controllers/post.controller");
const postRepository = require("../../../repository/postRepository");
const db = require('../../../connection');

jest.mock('../../../connection');
jest.mock("../../../repository/postRepository");

describe("Post Controller - Select Post", () => {

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

    it("should return 200 to show post", async () => {
        postRepository.qSelectPosts.mockResolvedValue([ [] ]);
        await postController.posts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "แสดง post ทั้งหมด",
            data: []
        });
    }) 
})