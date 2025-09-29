import { PrismaClient } from "@prisma/client";
import { TicketRepository } from "../../core/domain/repositories/ticket-repository";
import { Ticket } from "../../core/domain/entities/ticket-entity";

export class PrismaTicketRepository implements TicketRepository {
  constructor(private prisma: PrismaClient) {}

  async create(ticket: Ticket): Promise<Ticket> {
    const data = await this.prisma.ticket.create({
      data: {
        id: ticket.id,
        orderId: ticket.orderId,
        showtimeId: ticket.showtimeId,
        price: ticket.price,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
      },
    });

    return new Ticket(
      {
        orderId: data.orderId,
        showtimeId: data.showtimeId,
        price: Number(data.price),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findById(id: string): Promise<Ticket | null> {
    const data = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Ticket(
      {
        orderId: data.orderId,
        showtimeId: data.showtimeId,
        price: Number(data.price),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByOrderId(orderId: string): Promise<Ticket[]> {
    const data = await this.prisma.ticket.findMany({
      where: { orderId },
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (ticket) =>
        new Ticket(
          {
            orderId: ticket.orderId,
            showtimeId: ticket.showtimeId,
            price: Number(ticket.price),
          },
          ticket.id,
          ticket.createdAt,
          ticket.updatedAt
        )
    );
  }

  async findByShowtimeId(showtimeId: string): Promise<Ticket[]> {
    const data = await this.prisma.ticket.findMany({
      where: { showtimeId },
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (ticket) =>
        new Ticket(
          {
            orderId: ticket.orderId,
            showtimeId: ticket.showtimeId,
            price: Number(ticket.price),
          },
          ticket.id,
          ticket.createdAt,
          ticket.updatedAt
        )
    );
  }

  async findAll(): Promise<Ticket[]> {
    const data = await this.prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (ticket) =>
        new Ticket(
          {
            orderId: ticket.orderId,
            showtimeId: ticket.showtimeId,
            price: Number(ticket.price),
          },
          ticket.id,
          ticket.createdAt,
          ticket.updatedAt
        )
    );
  }

  async update(ticket: Ticket): Promise<Ticket> {
    const data = await this.prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        orderId: ticket.orderId,
        showtimeId: ticket.showtimeId,
        price: ticket.price,
        updatedAt: ticket.updatedAt,
      },
    });

    return new Ticket(
      {
        orderId: data.orderId,
        showtimeId: data.showtimeId,
        price: Number(data.price),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.ticket.delete({
      where: { id },
    });
  }
}
