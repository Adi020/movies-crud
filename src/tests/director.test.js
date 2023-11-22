const app = require("../app");
const request = require("supertest");
const Movies = require("../models/Movie");
require("../models");

let id;

test("GET /directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors", async () => {
  const director = {
    firstName: "German",
    lastName: "Váldez",
    nationality: "Mexican",
    image: "image.com",
    birthday: "20/10/10",
  };
  const res = await request(app).post("/directors").send(director);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("PUT /directors/:id", async () => {
  const directorUpdated = {
    firstName: "German Updated",
  };
  const res = await request(app).put(`/directors/${id}`).send(directorUpdated);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(directorUpdated.firstName);
});

test("POST /directors/:id/movies", async () => {
  const movie = await Movies.create({
    name: "kill bill",
    image: "kill-bill.com",
    synopsis: "synopsis kill bill",
    releaseYear: 2003,
  });
  const res = await request(app)
    .post(`/directors/${id}/movies`)
    .send([movie.id]);
  await movie.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("DELETE /directors/:id", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
