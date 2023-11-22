const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieActors,
  setMovieDirectors,
  setMovieGenres,
} = require("../controllers/movies.controller");
const express = require("express");

const moviesRouter = express.Router();

moviesRouter.route("/").get(getAll).post(create);

moviesRouter.route("/:id").get(getOne).delete(remove).put(update);

moviesRouter.route("/:id/actors").post(setMovieActors);

moviesRouter.route("/:id/directors").post(setMovieDirectors)

moviesRouter.route("/:id/genres").post(setMovieGenres)

module.exports = moviesRouter;
