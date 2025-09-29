import { PrismaClient } from "@prisma/client";
import { MovieRepository } from "../../core/domain/repositories/movie-repository";
import { Movie } from "../../core/domain/entities/movie-entity";

export class PrismaMovieRepository implements MovieRepository {
  constructor(private prisma: PrismaClient) {}

  async create(movie: Movie): Promise<Movie> {
    const data = await this.prisma.movie.create({
      data: {
        id: movie.id,
        title: movie.title,
        synopsis: movie.synopsis,
        rating: movie.rating,
        durationMinutes: movie.durationMinutes,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      },
    });

    return new Movie(
      {
        title: data.title,
        synopsis: data.synopsis,
        rating: data.rating,
        durationMinutes: data.durationMinutes,
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findById(id: string): Promise<Movie | null> {
    const data = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Movie(
      {
        title: data.title,
        synopsis: data.synopsis,
        rating: data.rating,
        durationMinutes: data.durationMinutes,
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByTitle(title: string): Promise<Movie | null> {
    const data = await this.prisma.movie.findFirst({
      where: { title },
    });

    if (!data) return null;

    return new Movie(
      {
        title: data.title,
        synopsis: data.synopsis,
        rating: data.rating,
        durationMinutes: data.durationMinutes,
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findAll(): Promise<Movie[]> {
    const data = await this.prisma.movie.findMany({
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (movie) =>
        new Movie(
          {
            title: movie.title,
            synopsis: movie.synopsis,
            rating: movie.rating,
            durationMinutes: movie.durationMinutes,
          },
          movie.id,
          movie.createdAt,
          movie.updatedAt
        )
    );
  }

  async update(movie: Movie): Promise<Movie> {
    const data = await this.prisma.movie.update({
      where: { id: movie.id },
      data: {
        title: movie.title,
        synopsis: movie.synopsis,
        rating: movie.rating,
        durationMinutes: movie.durationMinutes,
        updatedAt: movie.updatedAt,
      },
    });

    return new Movie(
      {
        title: data.title,
        synopsis: data.synopsis,
        rating: data.rating,
        durationMinutes: data.durationMinutes,
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.movie.delete({
      where: { id },
    });
  }
}
