// imports
const path = require('path');
const { Sequelize, DataTypes } = require("sequelize");

//create an instance of the database call it db
const db = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: path.join(__dirname,"./movie_watchlist.sqlite"),
  logging: false,
});

//export
module.exports = { db, DataTypes };
