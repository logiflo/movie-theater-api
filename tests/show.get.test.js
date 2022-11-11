const app = require("../src/server");
const request = require("supertest");
const { Show } = require("../src/models");
const seed = require("../src/db/seed");

describe("shows endpoint", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("GET /shows", () => {
    test("succeeds", async () => {
      const { statusCode } = await request(app).get("/shows/");

      expect(statusCode).toBe(200);
    });

    test("responds with application/json", async () => {
      const { headers } = await request(app).get("/shows/");

      expect(headers["content-type"]).toMatch("application/json");
    });
    test("responds with an collection of users", async () => {
      const { body } = await request(app).get("/shows/");

      expect(Array.isArray(body)).toBe(true);
      expect(body.every(({ title, genre, rating, status }) => title && genre && rating && status));
    });
  });


  describe("GET /shows/:show_id", () => {
    describe("with a valid :show_id", () => {
      test("succeeds", async () => {
        const show = await Show.findOne();

        const { statusCode } = await request(app).get(`/shows/${show.id}`);

        expect(statusCode).toBe(200);
      });

      test("responds with application/json", async () => {
        const show = await Show.findOne();

        const { headers } = await request(app).get(`/shows/${show.id}`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with the user", async () => {
        const show = await Show.findOne();

        const { body } = await request(app).get(`/shows/${show.id}`);

        expect(body).toMatchObject(JSON.parse(JSON.stringify(show)));
      });
    });

    describe("with an invalid :user_id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app).get("/shows/0");

        expect(statusCode).toBe(404);
      });
    });
  });

  describe("GET /shows/genres/:genre", () => {
    describe("with a valid :genre", () => {
      test("succeeds", async () => {
        const show = await Show.findOne();

        console.log(`/shows/genres/${show.genre}`)

        const { statusCode } = await request(app).get(`/shows/genres/${show.genre}`);

        expect(statusCode).toBe(200);
      });

      test("responds with application/json", async () => {
        const show = await Show.findOne();

        const { headers } = await request(app).get(`/shows/genres/${show.genre}`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with the collection of shows", async () => {
        const show = await Show.findOne();

        const { body } = await request(app).get(`/shows/genres/${show.genre}`);

        expect(Array.isArray(body)).toBe(true);
      });
    });

    describe("with an invalid :genre", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app).get("/shows/genres/invalid");

        expect(statusCode).toBe(404);
      });
    });
  });
});
