const db = require('../../../connection');
const commentRepository = require('../../../repository/commentRepository');
jest.mock('../../../connection');
describe("Comment Repository - Add Comment", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return object after insert data", async () => {
        const postId = 1;
        const userId = 1;
        const body = "พลังคลื่นเต่า";
        const mockDbResult = { affectedRows: 1, insertId: 101 };

        db.query.mockResolvedValue([mockDbResult]); 
        const result = await commentRepository.addComment(postId, userId, body);

        expect(result).toEqual(mockDbResult);
        expect(db.query).toHaveBeenCalledTimes(1);
        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining("insert into comments"), 
            [postId, userId, body] 
        );
    })
})