const { User } = require("../models");

async function getUserById(request, response, next) {
  request.user = await User.findByPk(request.params.user_id);
  if (!request.user) return response.sendStatus(404);

  next();
}

function checkRating(request, response, next) {
  const rating = request.body.rating;

  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return response.status(400).send("Rating must be a number between 0 and 5");
  }

  next();
}

module.exports = { getUserById, checkRating };
