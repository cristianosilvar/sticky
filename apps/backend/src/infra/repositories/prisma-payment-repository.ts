import { PrismaClient } from "@prisma/client";
import { PaymentRepository } from "../../core/domain/repositories/payment-repository";
import { Payment } from "../../core/domain/entities/payment-entity";

export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prisma: PrismaClient) {}

  async create(payment: Payment): Promise<Payment> {
    const data = await this.prisma.payment.create({
      data: {
        id: payment.id,
        orderId: payment.orderId,
        price: payment.price,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      },
    });

    return new Payment(
      {
        orderId: data.orderId,
        price: Number(data.price),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findById(id: string): Promise<Payment | null> {
    const data = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Payment(
      {
        orderId: data.orderId,
        price: Number(data.price),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByOrderId(orderId: string): Promise<Payment[]> {
    const data = await this.prisma.payment.findMany({
      where: { orderId },
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (payment) =>
        new Payment(
          {
            orderId: payment.orderId,
            price: Number(payment.price),
          },
          payment.id,
          payment.createdAt,
          payment.updatedAt
        )
    );
  }

  async findAll(): Promise<Payment[]> {
    const data = await this.prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (payment) =>
        new Payment(
          {
            orderId: payment.orderId,
            price: Number(payment.price),
          },
          payment.id,
          payment.createdAt,
          payment.updatedAt
        )
    );
  }

  async update(payment: Payment): Promise<Payment> {
    const data = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        orderId: payment.orderId,
        price: payment.price,
        updatedAt: payment.updatedAt,
      },
    });

    return new Payment(
      {
        orderId: data.orderId,
        price: Number(data.price),
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payment.delete({
      where: { id },
    });
  }
}
