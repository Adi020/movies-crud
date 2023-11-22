const app = require("../app");
const request = require("supertest");
const Actors = require("../models/Actor");
const Directors = require("../models/Director");
const Genres = require("../models/Genre");
require("../models");

test("GET /movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies", async () => {
  const movie = {
    name: "kill bill",
    image: "kill-bill.com",
    synopsis: "synopsis kill bill",
    releaseYear: 2003,
  };
  const res = await request(app).post("/movies").send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("PUT /movies/:id", async () => {
  const movieUpdate = {
    name: "Kill Bill Update",
  };
  const res = await request(app).put(`/movies/${id}`).send(movieUpdate);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movieUpdate.name);
});

test("POST /movies/:id/actors", async () => {
  const actor = await Actors.create({
    firstName: "Fernando",
    lastName: "Gustavo",
    nationality: "Mexican",
    image: "image.com",
    birthday: "20/10/10",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors", async () => {
  const director = await Directors.create({
    firstName: "Fernando",
    lastName: "Gustavo",
    nationality: "Mexican",
    image: "image.com",
    birthday: "20/10/10",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/genres", async () => {
  const genre = await Genres.create({
    name: "Horror2",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});
