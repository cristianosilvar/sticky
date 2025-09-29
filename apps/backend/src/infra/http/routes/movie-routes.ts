import { Router } from "express";

import { CreateMovieController } from "../controllers/movies/create-movie-controller";
import { ListMoviesController } from "../controllers/movies/list-movies-controller";
import { FindMovieByIdController } from "../controllers/movies/find-movie-by-id-controller";

const movieRoutes = Router();

const createMovieController = new CreateMovieController();
const listMoviesController = new ListMoviesController();
const findMovieByIdController = new FindMovieByIdController();

movieRoutes.post("/", async (req, res) => {
  createMovieController.handle(req, res);
  return;
});
movieRoutes.get("/", async (req, res) => {
  listMoviesController.handle(req, res);
  return;
});
movieRoutes.get("/:id", async (req, res) => {
  findMovieByIdController.handle(req, res);
  return;
});

export { movieRoutes };
