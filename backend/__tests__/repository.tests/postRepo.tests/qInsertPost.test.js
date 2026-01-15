const db = require('../../../connection');
const postRepository = require('../../../repository/postRepository');
jest.mock('../../../connection');

describe('Post Repository - Query Insert Posts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return object after insert successfully", async () => {
        const mockDbResult = [1, "YERM - ทิตตี้ฮ่องเต้ (MV อย่างเป็นทางการ)", "หมู่บ้านนครหลวงไทยนครหลวงและหมู่บ้านนครหลวงไทยนครหลวง"];
        
        const userId = 1;
        const title = "YERM - ทิตตี้ฮ่องเต้ (MV อย่างเป็นทางการ)";
        const content = "หมู่บ้านนครหลวงไทยนครหลวงและหมู่บ้านนครหลวงไทยนครหลวง";
        
        db.query.mockResolvedValue([[userId, title, content]]);
        const result = await postRepository.qInsertPost(userId, title, content);
        expect(result).toEqual(mockDbResult);
        expect(db.query).toHaveBeenCalledTimes(1);
    })
})