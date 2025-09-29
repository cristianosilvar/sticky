import { Either, left, right } from "../../../shared/utils/either";
import { ShowtimeRepository } from "../../domain/repositories/showtime-repository";
import { MovieRepository } from "../../domain/repositories/movie-repository";
import {
  Showtime,
  ShowtimeStatus,
} from "../../domain/entities/showtime-entity";
import {
  CreateShowtimeInput,
  CreateShowtimeOutput,
} from "../dto/create-showtime-dto";
import { logger } from "../../../infra/config/logger";

export class CreateShowtime {
  constructor(
    private showtimeRepository: ShowtimeRepository,
    private movieRepository: MovieRepository
  ) {}

  async execute(
    data: CreateShowtimeInput
  ): Promise<Either<string, CreateShowtimeOutput>> {
    try {
      // Validações
      if (!data.movieId) {
        return left("ID do filme é obrigatório");
      }

      if (!data.date) {
        return left("Data é obrigatória");
      }

      if (!data.startAt) {
        return left("Horário de início é obrigatório");
      }

      if (data.basePrice < 0) {
        return left("Preço base deve ser maior ou igual a 0");
      }

      // Verificar se o filme existe
      const movie = await this.movieRepository.findById(data.movieId);
      if (!movie) {
        return left("Filme não encontrado");
      }

      // Validar status
      if (
        !Object.values(ShowtimeStatus).includes(data.status as ShowtimeStatus)
      ) {
        return left("Status inválido");
      }

      // Validar se a data não é no passado
      const now = new Date();
      if (data.date < now) {
        return left("Data não pode ser no passado");
      }

      // Criar a entidade Showtime
      const showtime = new Showtime({
        date: data.date,
        movieId: data.movieId,
        startAt: data.startAt,
        status: data.status as ShowtimeStatus,
        basePrice: data.basePrice,
      });

      // Salvar no repositório
      const savedShowtime = await this.showtimeRepository.create(showtime);

      // Retornar o resultado
      return right({
        id: savedShowtime.id,
        date: savedShowtime.date,
        movieId: savedShowtime.movieId,
        startAt: savedShowtime.startAt,
        status: savedShowtime.status,
        basePrice: savedShowtime.basePrice,
        createdAt: savedShowtime.createdAt,
        updatedAt: savedShowtime.updatedAt,
      });
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
