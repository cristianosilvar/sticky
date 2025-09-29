import { Movie } from "../entities/movie-entity";

export interface MovieRepository {
  create(movie: Movie): Promise<Movie>;
  findById(id: string): Promise<Movie | null>;
  findByTitle(title: string): Promise<Movie | null>;
  findAll(): Promise<Movie[]>;
  update(movie: Movie): Promise<Movie>;
  delete(id: string): Promise<void>;
}
