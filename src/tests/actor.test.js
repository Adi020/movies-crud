const request = require("supertest");
const app = require("../app");
const Movies = require("../models/Movie");
require("../models");

let id;

test("GET /actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors", async () => {
  const actor = {
    firstName: "Fernando",
    lastName: "Gustavo",
    nationality: "Mexican",
    image: "image.com",
    birthday: "20/10/10",
  };
  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("PUT /actors/:id", async () => {
  const actorUpdated = {
    firstName: "Fernando Updated",
  };
  const res = await request(app).put(`/actors/${id}`).send(actorUpdated);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(actorUpdated.firstName);
});

test("POST /actors/:id/movies", async () => {
  const movie = await Movies.create({
    name: "kill bill",
    image: "kill-bill.com",
    synopsis: "synopsis kill bill",
    releaseYear: 2003,
  });
  const res = await request(app).post(`/actors/${id}/movies`).send([movie.id]);
  await movie.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("DELETE /actors/:id", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
