import { logger } from "../../../infra/config/logger";
import { Either, left, right } from "../../../shared/utils/either";
import { ShowtimeRepository } from "../../domain/repositories/showtime-repository";
import { CreateShowtimeOutput } from "../dto/create-showtime-dto";

export class ListAvailableShowtimes {
  constructor(private showtimeRepository: ShowtimeRepository) {}

  async execute(): Promise<Either<string, CreateShowtimeOutput[]>> {
    try {
      const showtimes = await this.showtimeRepository.findAvailable();

      const showtimesOutput = showtimes.map((showtime) => ({
        id: showtime.id,
        date: showtime.date,
        movieId: showtime.movieId,
        startAt: showtime.startAt,
        status: showtime.status,
        basePrice: showtime.basePrice,
        createdAt: showtime.createdAt,
        updatedAt: showtime.updatedAt,
      }));

      return right(showtimesOutput);
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
