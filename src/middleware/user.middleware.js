const { User } = require("../models");

async function getUserById(request, response, next) {
  request.user = await User.findByPk(request.params.user_id);

  next();
}

function checkRating(request, response, next) {
  if (!request.body.rating || request.body.rating === " ") {
    return response
      .status(400)
      .send("Rating field cannot be empty or contain whitespace");
  }

  if (request.body.rating < 0 || request.body.rating > 5) {
    return response.status(400).send("Rating must be between 0 and 5");
  }

  next();
}

module.exports = { getUserById, checkRating };
