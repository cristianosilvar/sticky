import { Ticket } from "../entities/ticket-entity";

export interface TicketRepository {
  create(ticket: Ticket): Promise<Ticket>;
  findById(id: string): Promise<Ticket | null>;
  findByOrderId(orderId: string): Promise<Ticket[]>;
  findByShowtimeId(showtimeId: string): Promise<Ticket[]>;
  findAll(): Promise<Ticket[]>;
  update(ticket: Ticket): Promise<Ticket>;
  delete(id: string): Promise<void>;
}
