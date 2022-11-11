const { Show } = require("../models");

async function getShowById(request, response, next) {
  request.show = await Show.findByPk(request.params.show_id);
  if (!request.show) return response.sendStatus(404);

  next();
}

async function getShowByGenre(request, response, next) {
  request.shows = await Show.findAll({
    where: { genre: request.params.genre },
  });
  if (!request.shows.length) return response.sendStatus(404);

  next();
}

async function updateStatus(request, response, next) {
  if (request.show.status === "cancelled") {
    request.updateStatus = "on-going";
  } else {
    request.updateStatus = "cancelled";
  }

  next();
}

module.exports = { getShowById, getShowByGenre, updateStatus };
