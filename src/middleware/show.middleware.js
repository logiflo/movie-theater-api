const { Show } = require("../models");

async function getShowById(request, response, next) {
  request.show = await Show.findByPk(request.params.show_id);

  next();
}

async function getShowByGenre(request, response, next) {
  request.shows = await Show.findAll({
    where: { genre: request.params.genre },
  });

  next();
}

module.exports = { getShowById, getShowByGenre };
