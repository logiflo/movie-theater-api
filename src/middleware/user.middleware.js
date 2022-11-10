const { User } = require('../models');

async function getUserById(request, response, next) {
  request.user = await User.findByPk(request.params.user_id);

  next();
}

module.exports = getUserById;
