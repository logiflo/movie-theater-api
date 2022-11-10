const { Router } = require("express");
const userRouter = Router();

const { User } = require("../models");

const { getUserById, checkRating } = require("../middleware");

userRouter.get("/", async (request, response) => {
  const allUsers = await User.findAll();
  response.send(allUsers);
});

userRouter.get("/:user_id", getUserById, async (request, response) => {
  response.send(request.user);
});

userRouter.get("/:user_id/shows", getUserById, async (request, response) => {
  const userShows = await request.user.getShows();
  response.send(userShows);
});

userRouter.put(
  "/:user_id/shows/:show_id",
  checkRating,
  getUserById,
  async (request, response) => {
    const userShows = await request.user.getShows();
    const showToUpdate = userShows[request.params.show_id - 1];
    showToUpdate.update(request.body);
    response.status(201).send(showToUpdate);
  }
);

module.exports = userRouter;
