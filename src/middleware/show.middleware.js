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

function checkRating(request, response, next) {
  const rating = request.body.rating;

  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return response.status(400).send("Rating must be a number between 0 and 5");
  }

  next();
}

function isAllShowData(body) {
  if (!body.title || !body.genre || !body.status) {
    return false;
  }

  return true;
}

module.exports = {
  getShowById,
  getShowByGenre,
  updateStatus,
  checkRating,
  isAllShowData,
};
