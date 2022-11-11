const app = require("../src/server");
const request = require("supertest");
const { User } = require("../src/models");
const seed = require("../src/db/seed");

describe("users endpoint", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("GET /users", () => {
    test("succeeds", async () => {
      const { statusCode } = await request(app).get("/users/");

      expect(statusCode).toBe(200);
    });

    test("responds with application/json", async () => {
      const { headers } = await request(app).get("/users/");

      expect(headers["content-type"]).toMatch("application/json");
    });
    test("responds with an collection of users", async () => {
      const { body } = await request(app).get("/users/");

      expect(Array.isArray(body)).toBe(true);
      expect(body.every(({ username, password }) => username && password));
    });
  });

  describe("GET /users/:user_id", () => {
    describe("with a valid :user_id", () => {
      test("succeeds", async () => {
        const user = await User.findOne();

        const { statusCode } = await request(app).get(`/users/${user.id}`);

        expect(statusCode).toBe(200);
      });

      test("responds with application/json", async () => {
        const user = await User.findOne();

        const { headers } = await request(app).get(`/users/${user.id}`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with the user", async () => {
        const user = await User.findOne();

        const { body } = await request(app).get(`/users/${user.id}`);

        expect(body).toMatchObject(JSON.parse(JSON.stringify(user)));
      });
    });

    describe("with an invalid :user_id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app).get("/users/0");

        expect(statusCode).toBe(404);
      });
    });
  });

  describe("GET /users/:user_id/shows", () => {
    describe("with a valid :id", () => {
      test("succeeds", async () => {
        const user = await User.findOne();

        const { statusCode } = await request(app).get(
          `/users/${user.id}/shows`
        );

        expect(statusCode).toBe(200);
      });

      test("responds with application/json", async () => {
        const user = await User.findOne();

        const { headers } = await request(app).get(`/users/${user.id}/shows`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with a collection of shows", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { body } = await request(app).get(`/users/${user.id}/shows`);

        expect(Array.isArray(body)).toBe(true);
        expect(body.every(({ title, genre, rating, status }) => title && genre && rating && status));
      });
    });

    describe("with an invalid :id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app).get("/users/0/shows");

        expect(statusCode).toBe(404);
      });
    });
  });
});
