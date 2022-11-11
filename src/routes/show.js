const { Router } = require("express");
const showRouter = Router();

const { Show } = require("../models");
const { getShowById, getShowByGenre, updateStatus, checkRating } = require("../middleware");

showRouter.get("/", async (request, response) => {
  const allShows = await Show.findAll();
  if(!allShows.length) return response.sendStatus(404);

  response.send(allShows);
});

showRouter.get("/:show_id", getShowById, async (request, response) => {
  response.send(request.show);
});

showRouter.get("/genres/:genre", getShowByGenre, async (request, response) => {
  response.send(request.shows);
});

showRouter.put("/:show_id/watched",checkRating, getShowById, async (request, response) => {
  await request.show.update(request.body);
  response.status(201).send(request.show);
});

showRouter.put(
  "/:show_id/update",
  getShowById,
  updateStatus,
  async (request, response) => {
    await request.show.update({ status: request.updateStatus });
    response.status(201).send(request.show);
  }
);

showRouter.delete("/:show_id", getShowById, async (request, response) => {
  request.show.destroy();
  response.send(request.show);
});

module.exports = showRouter;
