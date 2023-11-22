const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setActorMovie,
} = require("../controllers/actors.controller");
const express = require("express");

const actorsRouter = express.Router();

actorsRouter.route("/").get(getAll).post(create);

actorsRouter.route("/:id").get(getOne).delete(remove).put(update);

actorsRouter.route("/:id/movies").post(setActorMovie);

module.exports = actorsRouter;
