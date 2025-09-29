import { Either, left, right } from "../../../shared/utils/either";
import { MovieRepository } from "../../domain/repositories/movie-repository";
import { Movie } from "../../domain/entities/movie-entity";
import { CreateMovieInput, CreateMovieOutput } from "../dto/create-movie-dto";
import { logger } from "../../../infra/config/logger";

export class CreateMovie {
  constructor(private movieRepository: MovieRepository) {}

  async execute(
    data: CreateMovieInput
  ): Promise<Either<string, CreateMovieOutput>> {
    try {
      // Validações
      if (!data.title || data.title.trim().length === 0) {
        return left("Título é obrigatório");
      }

      if (!data.synopsis || data.synopsis.trim().length === 0) {
        return left("Sinopse é obrigatória");
      }

      if (data.rating < 0 || data.rating > 10) {
        return left("Rating deve estar entre 0 e 10");
      }

      if (data.durationMinutes <= 0) {
        return left("Duração deve ser maior que 0");
      }

      // Verificar se já existe um filme com o mesmo título
      const existingMovie = await this.movieRepository.findByTitle(data.title);
      if (existingMovie) {
        return left("Já existe um filme com este título");
      }

      // Criar a entidade Movie
      const movie = new Movie({
        title: data.title.trim(),
        synopsis: data.synopsis.trim(),
        rating: data.rating,
        durationMinutes: data.durationMinutes,
      });

      // Salvar no repositório
      const savedMovie = await this.movieRepository.create(movie);

      // Retornar o resultado
      return right({
        id: savedMovie.id,
        title: savedMovie.title,
        synopsis: savedMovie.synopsis,
        rating: savedMovie.rating,
        durationMinutes: savedMovie.durationMinutes,
        createdAt: savedMovie.createdAt,
        updatedAt: savedMovie.updatedAt,
      });
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
