const app = require("../src/server");
const request = require("supertest");
const { User } = require("../src/models");
const seed = require("../src/db/seed");

describe("users endpoint", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("PUT /users/:user_id/shows/:show_id", () => {
    describe("with a valid :user_id", () => {
      test("with valid parameters", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length}`)
          .send({ rating: 4 });

        expect(statusCode).toBe(201);
      });

      test("responds with application/json", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { headers } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length}`)
          .send({ rating: 4 });

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with a show", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { body } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length}`)
          .send({ rating: 4 });

        expect(body).toMatchObject({rating: 4});
        expect(body).toMatchObject({ title: userShows[userShows.length - 1].title });
      });
    });

    describe("with an invalid :user_id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app)
          .put("/users/0/shows/2")
          .send({ rating: 4 });

        expect(statusCode).toBe(404);
      });
    });

    describe("with an invalid pasword", () => {
      test("fails with Bad Request if rating is greater than 5", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length}`)
          .send({ rating: 10 });

        expect(statusCode).toBe(400);
      });

      test("fails with Bad Request if rating is less than 0", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length}`)
          .send({ rating: -8 });

        expect(statusCode).toBe(400);
      });

      test("fails with Bad Request if rating is not a number", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length}`)
          .send({ rating: " " });

        expect(statusCode).toBe(400);
      });
    });

    describe("create a show", () => {
      test("success", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length + 1}`)
          .send({ title: "title", genre:"Drama", status: "cancelled" });

        expect(statusCode).toBe(201);
      });

      test("fails with Bad Request if missing title", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length + 1}`)
          .send({ genre:"Drama", status: "cancelled" });

        expect(statusCode).toBe(400);
      });

      test("fails with Bad Request if missing genre", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length + 1}`)
          .send({ title: "title", status: "cancelled" });

        expect(statusCode).toBe(400);
      });

      test("fails with Bad Request if missing status", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length + 1}`)
          .send({ title: "title", genre:"Drama" });

        expect(statusCode).toBe(400);
      });

      test("fails with Bad Request if status is not cancelled or on-going", async () => {
        const user = await User.findOne();
        const userShows = await user.getShows();

        const { statusCode } = await request(app)
          .put(`/users/${user.id}/shows/${userShows.length + 1}`)
          .send({ title: "title", genre:"Drama", status: "hh" });

        expect(statusCode).toBe(400);
      });
    });


  });
});
