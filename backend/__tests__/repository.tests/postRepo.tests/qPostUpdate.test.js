const db = require('../../../connection');
const postRepository = require('../../../repository/postRepository');
jest.mock('../../../connection');

describe('Post Repository - Query Update Posts', () => {
    beforeAll(() => {
        jest.clearAllMocks();
    })

    it("should is update successfully", async () => {

        const postId = 1;
        const userId = 2;
        const title = "Artist : PURPEECH";
        const content = "Axis Studio Sound Engineers :";

        db.query.mockResolvedValue([{
            affectedRows: 1
        }]);

        const result = await postRepository.qPostUpdate(postId, userId, title, content);

        expect(result).toBe(1); 
        expect(db.query).toHaveBeenCalledTimes(1);
    })
})