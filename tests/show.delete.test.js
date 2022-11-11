const app = require("../src/server");
const request = require("supertest");
const { Show } = require("../src/models");
const seed = require("../src/db/seed");

describe("shows endpoint", () => {
  beforeAll(async () => {
    await seed();
  });

  describe("DELETE /shows/:show_id", () => {
    describe("with a valid :show_id", () => {
      test("with valid parameters", async () => {
        const show = await Show.findOne();
        console.log(show);

        const { statusCode } = await request(app).delete(`/shows/${show.id}`);

        console.log(statusCode);

        expect(statusCode).toBe(200);
      });

      test("responds with application/json", async () => {
        const show = await Show.findOne();

        const { headers } = await request(app).delete(`/shows/${show.id}`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with a show", async () => {
        const show = await Show.findOne({
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        const { body } = await request(app).delete(`/shows/${show.id}`);

        expect(body).toEqual(expect.objectContaining(show.toJSON()));
      });
    });

    describe("with an invalid :show_id", () => {
      test("fails with Not Found", async () => {
        console.log(7);
        const { statusCode } = await request(app).delete("/shows/0");

        console.log(statusCode);

        expect(statusCode).toBe(404);
      });
    });
  });
});
