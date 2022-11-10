const { Router } = require("express");
const showRouter = Router();

const { Show } = require("../models");
const { getShowById, getShowByGenre } = require("../middleware");

showRouter.get("/", async (request, response) => {
  const allShows = await Show.findAll();
  response.send(allShows);
});

showRouter.get("/:show_id", getShowById, async (request, response) => {
  response.send(request.show);
});

showRouter.get("/genres/:genre", getShowByGenre, async (request, response) => {
  response.send(request.shows);
});

module.exports = showRouter;
