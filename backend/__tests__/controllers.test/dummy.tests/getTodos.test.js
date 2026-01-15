const { default: axios } = require('axios');
const db = require('../../../connection');
const dummyController = require('../../../controllers/dummy.controller');
jest.mock('../../../connection');
jest.mock("axios");

describe('Dummy Controller - Get Todos', () => {
    let req, res;
    beforeAll(() => {
        jest.clearAllMocks();
    })

    it("should return 200 response Todo", async () => {
        req = {}
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

        const mock = {
            userId: 1,
            id: 1,
            title: "qui ullam ratione quibusdam voluptatem quia omnis",
            completed: false
        }

        axios.get.mockResolvedValue({
            data: mock
        })

        await dummyController.getTodos(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            mock)
    })
})