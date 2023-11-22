const Actors = require("./Actor");
const Directors = require("./Director");
const Genres = require("./Genre");
const Movies = require("./Movie");

Actors.belongsToMany(Movies, { through: "ActorsMovies" });
Movies.belongsToMany(Actors, { through: "ActorsMovies" });

Movies.belongsToMany(Directors, { through: "directorsMovies" });
Directors.belongsToMany(Movies, { through: "directorsMovies" });

Movies.belongsToMany(Genres, { through: "moviesGenres" });
Genres.belongsToMany(Movies, { through: "moviesGenres" });
