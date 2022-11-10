const { getUserById, checkRating } = require("./user.middleware");
const {
  getShowById,
  getShowByGenre,
  updateStatus,
} = require("./show.middleware");

module.exports = {
  getUserById,
  checkRating,
  getShowById,
  getShowByGenre,
  updateStatus,
};
