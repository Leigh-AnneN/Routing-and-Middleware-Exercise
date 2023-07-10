process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require("../app");

let items = require("../fakeDb");

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(function () {
    items.push(popsicle);
    }
);

afterEach(function () {
    //empty out the array
    items.length = 0;
    }
);

describe("GET /items", function () {
    test("Gets a list of items", async function () {
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ items: [popsicle] });
    });
}
);

describe("GET /items/:name", function () {
    test("Gets a single item", async function () {
        const resp = await request(app).get(`/items/${popsicle.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ item: popsicle });
    });
    test("Responds with 404 if can't find item", async function () {
        const resp = await request(app).get(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
}
);


describe("POST /items", function () {
    test("Creates a new item", async function () {
        const resp = await request(app)
            .post(`/items`)
            .send({
                name: "pizza",
                price: 2.99
            });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            item: { name: "pizza", price: 2.99 }
        });
        
    }
    );
}
);

describe("PATCH /items/:name", function () {
    test("Updates a single item", async function () {
        const resp = await request(app)
            .patch(`/items/${popsicle.name}`)
            .send({
                name: "pizza",
                price: 2.99
            });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: { name: "pizza", price: 2.99 }
        });
        test("Responds with 404 if can't find item", async function () {
            const resp = await request(app).patch(`/items/0`);
            expect(resp.statusCode).toBe(404);
        });
    }
    );
}
);

describe("DELETE /items/:name", function () {
    test("Deletes a single a item", async function () {
        const resp = await request(app)
            .delete(`/items/${popsicle.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });  
    });
    test("Responds with 404 if can't find item", async function () {
        const resp = await request(app).delete(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
}
);

