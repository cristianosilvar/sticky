import { logger } from "../../../infra/config/logger";
import { Either, left, right } from "../../../shared/utils/either";
import { MovieRepository } from "../../domain/repositories/movie-repository";
import { CreateMovieOutput } from "../dto/create-movie-dto";

export class FindMovieById {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: string): Promise<Either<string, CreateMovieOutput>> {
    try {
      const movie = await this.movieRepository.findById(id);

      if (!movie) {
        return left("Filme não encontrado");
      }

      return right({
        id: movie.id,
        title: movie.title,
        synopsis: movie.synopsis,
        rating: movie.rating,
        durationMinutes: movie.durationMinutes,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      });
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
