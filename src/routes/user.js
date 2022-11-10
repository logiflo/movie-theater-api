const { Router } = require("express");
const userRouter = Router();

const { User } = require("../models");

const { getUserById } = require("../middleware");

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

module.exports = userRouter;
