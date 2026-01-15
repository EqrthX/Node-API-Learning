const db = require('../../../connection');
const postRepository = require('../../../repository/postRepository');
jest.mock('../../../connection');

describe('Post Repository - Query Select Posts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ("should return object after query successfully", async () => {
        const mockDbResult = { id: 1, title: "เฟี้ยว", content: "เก่งมาก" };
        db.query.mockResolvedValue([mockDbResult])
        const result = await postRepository.qSelectPosts();
        expect(result).toEqual(mockDbResult);
        expect(db.query).toHaveBeenCalledTimes(1);


    })
})
