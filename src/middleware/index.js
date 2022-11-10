const getUserById = require("./user.middleware");
const { getShowById, getShowByGenre } = require("./show.middleware");

module.exports = {
  getUserById,
  getShowById,
  getShowByGenre,
};
