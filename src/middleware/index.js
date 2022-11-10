const getUserById = require("./user.middleware");
const {
  getShowById,
  getShowByGenre,
  updateStatus,
} = require("./show.middleware");

module.exports = {
  getUserById,
  getShowById,
  getShowByGenre,
  updateStatus,
};
