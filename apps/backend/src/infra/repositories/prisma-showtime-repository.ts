import { PrismaClient } from "@prisma/client";
import { ShowtimeRepository } from "../../core/domain/repositories/showtime-repository";
import {
  Showtime,
  ShowtimeStatus,
} from "../../core/domain/entities/showtime-entity";

export class PrismaShowtimeRepository implements ShowtimeRepository {
  constructor(private prisma: PrismaClient) {}

  async create(showtime: Showtime): Promise<Showtime> {
    const data = await this.prisma.showtime.create({
      data: {
        id: showtime.id,
        date: showtime.date,
        movieId: showtime.movieId,
        startAt: showtime.startAt,
        status: showtime.status,
        basePrice: showtime.basePrice,
        createdAt: showtime.createdAt,
        updatedAt: showtime.updatedAt,
      },
    });

    return new Showtime(
      {
        date: data.date,
        movieId: data.movieId,
        startAt: data.startAt,
        status: data.status as ShowtimeStatus,
        basePrice: Number(data.basePrice),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findById(id: string): Promise<Showtime | null> {
    const data = await this.prisma.showtime.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Showtime(
      {
        date: data.date,
        movieId: data.movieId,
        startAt: data.startAt,
        status: data.status as ShowtimeStatus,
        basePrice: Number(data.basePrice),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByMovieId(movieId: string): Promise<Showtime[]> {
    const data = await this.prisma.showtime.findMany({
      where: { movieId },
      orderBy: { date: "asc" },
    });

    return data.map(
      (showtime) =>
        new Showtime(
          {
            date: showtime.date,
            movieId: showtime.movieId,
            startAt: showtime.startAt,
            status: showtime.status as ShowtimeStatus,
            basePrice: Number(showtime.basePrice),
          },
          showtime.id,
          showtime.createdAt,
          showtime.updatedAt
        )
    );
  }

  async findByDate(date: Date): Promise<Showtime[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const data = await this.prisma.showtime.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { startAt: "asc" },
    });

    return data.map(
      (showtime) =>
        new Showtime(
          {
            date: showtime.date,
            movieId: showtime.movieId,
            startAt: showtime.startAt,
            status: showtime.status as ShowtimeStatus,
            basePrice: Number(showtime.basePrice),
          },
          showtime.id,
          showtime.createdAt,
          showtime.updatedAt
        )
    );
  }

  async findAvailable(): Promise<Showtime[]> {
    const data = await this.prisma.showtime.findMany({
      where: { status: "SCHEDULED" },
      orderBy: { date: "asc" },
    });

    return data.map(
      (showtime) =>
        new Showtime(
          {
            date: showtime.date,
            movieId: showtime.movieId,
            startAt: showtime.startAt,
            status: showtime.status as ShowtimeStatus,
            basePrice: Number(showtime.basePrice),
          },
          showtime.id,
          showtime.createdAt,
          showtime.updatedAt
        )
    );
  }

  async findAll(): Promise<Showtime[]> {
    const data = await this.prisma.showtime.findMany({
      orderBy: { date: "desc" },
    });

    return data.map(
      (showtime) =>
        new Showtime(
          {
            date: showtime.date,
            movieId: showtime.movieId,
            startAt: showtime.startAt,
            status: showtime.status as ShowtimeStatus,
            basePrice: Number(showtime.basePrice),
          },
          showtime.id,
          showtime.createdAt,
          showtime.updatedAt
        )
    );
  }

  async update(showtime: Showtime): Promise<Showtime> {
    const data = await this.prisma.showtime.update({
      where: { id: showtime.id },
      data: {
        date: showtime.date,
        movieId: showtime.movieId,
        startAt: showtime.startAt,
        status: showtime.status,
        basePrice: showtime.basePrice,
        updatedAt: showtime.updatedAt,
      },
    });

    return new Showtime(
      {
        date: data.date,
        movieId: data.movieId,
        startAt: data.startAt,
        status: data.status as ShowtimeStatus,
        basePrice: Number(data.basePrice),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.showtime.delete({
      where: { id },
    });
  }
}
