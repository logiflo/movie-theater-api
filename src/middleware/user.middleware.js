const { User, Show } = require("../models");
const { isAllShowData } = require("./show.middleware");

async function getUserById(request, response, next) {
  request.user = await User.findByPk(request.params.user_id);
  if (!request.user) return response.sendStatus(404);

  next();
}

async function checkUserShows(request, response, next) {
  request.userShows = await request.user.getShows();

  if (request.params.show_id > request.userShows.length) {
    if (!isAllShowData(request.body)) {
      const errorMsg =
        "Wrong data. To create a show it is needed title, genre, rating and status";
      return response.status(400).send(errorMsg);
    }

    const show = await Show.create(request.body);
    await request.user.addShow(show);
    return response.status(201).send(show);
  }

  const rating = request.body.rating;
  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return response.status(400).send("Rating must be a number between 0 and 5");
  }

  next();
}

module.exports = { getUserById, checkUserShows };
