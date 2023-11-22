const catchError = require("../utils/catchError");
const Actors = require("../models/Actor");
const Movies = require("../models/Movie");

const getAll = catchError(async (req, res) => {
  const results = await Actors.findAll({ include: [Movies] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Actors.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Actors.findByPk(id, { include: [Movies] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Actors.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Actors.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setActorMovie = catchError(async (req, res) => {
  const { id } = req.params;
  const actor = await Actors.findByPk(id);
  if (!actor) {
    return res.status(404).json({ message: "actor is not found" });
  }
  await actor.setMovies(req.body);
  const movies = await actor.getMovies();
  return res.json(movies);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setActorMovie,
};
