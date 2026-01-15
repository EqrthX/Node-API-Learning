const db = require('../../../connection');
const postRepository = require('../../../repository/postRepository');
jest.mock('../../../connection');

describe('Post Repository - Query Delete Posts', () => {
    beforeAll(() => {
        jest.clearAllMocks();
    })

    it("should is Delete successfully", async () => {
        const postId = 1;
        const userId = 1;

        db.query.mockResolvedValue([[]]);

        const result = await postRepository.qPostDelete(postId, userId);
        expect(result).toEqual(result); 
        expect(db.query).toHaveBeenCalledTimes(1);
    })
})