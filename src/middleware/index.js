const { getUserById, checkUserShows } = require("./user.middleware");
const {
  getShowById,
  getShowByGenre,
  updateStatus,
  checkRating,
  isAllShowData,
} = require("./show.middleware");

module.exports = {
  getUserById,
  checkRating,
  getShowById,
  getShowByGenre,
  updateStatus,
  checkUserShows,
  isAllShowData,
};
