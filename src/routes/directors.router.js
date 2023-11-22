const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setDirectorMovie,
} = require("../controllers/directors.controller");
const express = require("express");

const directorsRouter = express.Router();

directorsRouter.route("/").get(getAll).post(create);

directorsRouter.route("/:id").get(getOne).delete(remove).put(update);

directorsRouter.route("/:id/movies").post(setDirectorMovie);

module.exports = directorsRouter;
