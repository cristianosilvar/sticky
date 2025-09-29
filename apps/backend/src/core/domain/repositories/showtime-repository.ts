import { Showtime } from "../entities/showtime-entity";

export interface ShowtimeRepository {
  create(showtime: Showtime): Promise<Showtime>;
  findById(id: string): Promise<Showtime | null>;
  findByMovieId(movieId: string): Promise<Showtime[]>;
  findByDate(date: Date): Promise<Showtime[]>;
  findAvailable(): Promise<Showtime[]>;
  findAll(): Promise<Showtime[]>;
  update(showtime: Showtime): Promise<Showtime>;
  delete(id: string): Promise<void>;
}
