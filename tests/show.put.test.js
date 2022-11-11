const app = require("../src/server");
const request = require("supertest");
const { Show } = require("../src/models");
const seed = require("../src/db/seed");

describe("shows endpoint", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("PUT /shows/:show_id/watched", () => {
    describe("with a valid :show_id", () => {
      test("with valid parameters", async () => {
        const show = await Show.findOne();

        const { statusCode } = await request(app)
          .put(`/shows/${show.id}/watched`)
          .send({ rating: 4 });

        expect(statusCode).toBe(201);
      });

      test("responds with application/json", async () => {
        const show = await Show.findOne();

        const { headers } = await request(app)
          .put(`/shows/${show.id}/watched`)
          .send({ rating: 4 });

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with a show", async () => {
        const show = await Show.findOne();

        const { body } = await request(app)
          .put(`/shows/${show.id}/watched`)
          .send({ rating: 4 });

        expect(body).toMatchObject({ rating: 4 });
        expect(body).toMatchObject({ title: show.title });
      });
    });

    describe("with an invalid :show_id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app)
          .put("/shows/0/watched")
          .send({ rating: 4 });

        expect(statusCode).toBe(404);
      });
    });

    describe("with an invalid pasword", () => {
      test("fails with Bad Request if rating is greater than 5", async () => {
        const show = await Show.findOne();

        const { statusCode } = await request(app)
          .put(`/shows/${show.id}/watched`)
          .send({ rating: 10 });

        expect(statusCode).toBe(400);
      });

      test("fails with Bad Request if rating is less than 0", async () => {
        const show = await Show.findOne();

        const { statusCode } = await request(app)
          .put(`/shows/${show.id}/watched`)
          .send({ rating: -8 });

        expect(statusCode).toBe(400);
      });

      test("fails with Bad Request if rating is not a number", async () => {
        const show = await Show.findOne();

        const { statusCode } = await request(app)
          .put(`/shows/${show.id}/watched`)
          .send({ rating: " " });

        expect(statusCode).toBe(400);
      });
    });
  });

  describe("PUT /shows/:show_id/update", () => {
    describe("with a valid :show_id", () => {
      test("with valid parameters", async () => {
        const show = await Show.findOne();

        const { statusCode } = await request(app).put(
          `/shows/${show.id}/update`
        );

        expect(statusCode).toBe(201);
      });

      test("responds with application/json", async () => {
        const show = await Show.findOne();

        const { headers } = await request(app).put(`/shows/${show.id}/update`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with a show", async () => {
        const show = await Show.findOne();

        const { body } = await request(app).put(`/shows/${show.id}/update`);

        const showUpdated = await Show.findByPk(show.id);

        expect(body).toMatchObject({ status: showUpdated.status });
      });
    });

    describe("with an invalid :show_id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app).put("/shows/0/updated");

        expect(statusCode).toBe(404);
      });
    });
  });
});
