import { logger } from "../../../infra/config/logger";
import { Either, left, right } from "../../../shared/utils/either";
import { MovieRepository } from "../../domain/repositories/movie-repository";
import { CreateMovieOutput } from "../dto/create-movie-dto";

export class ListMovies {
  constructor(private movieRepository: MovieRepository) {}

  async execute(): Promise<Either<string, CreateMovieOutput[]>> {
    try {
      const movies = await this.movieRepository.findAll();

      const moviesOutput = movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        synopsis: movie.synopsis,
        rating: movie.rating,
        durationMinutes: movie.durationMinutes,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      }));

      return right(moviesOutput);
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
