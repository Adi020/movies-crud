const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Genres = sequelize.define(
  "genres",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Genres;
