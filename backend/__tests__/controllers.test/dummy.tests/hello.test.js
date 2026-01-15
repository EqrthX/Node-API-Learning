const db = require('../../../connection');
const dummyController = require('../../../controllers/dummy.controller');
jest.mock('../../../connection');

describe('Dummy Controller - Hello', () => {
    let req, res;
    beforeAll(() => {
        jest.clearAllMocks();
    })

    it("should return 200 response hello world", async () => {
        req = {}
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

        await dummyController.hello(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Hello World"
            }));
    })
})