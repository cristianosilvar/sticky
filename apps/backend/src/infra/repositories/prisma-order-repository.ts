import { PrismaClient } from "@prisma/client";

import { OrderRepository } from "../../core/domain/repositories/order-repository";
import { Order, OrderStatus } from "../../core/domain/entities/order-entity";

export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaClient) {}

  async create(order: Order): Promise<Order> {
    const data = await this.prisma.order.create({
      data: {
        id: order.id,
        userId: order.userId,
        orderStatus: order.orderStatus,
        totalPrice: order.totalPrice,
        expiredAt: order.expiredAt,
        paidAt: order.paidAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });

    return new Order(
      {
        userId: data.userId,
        orderStatus: data.orderStatus as OrderStatus,
        totalPrice: Number(data.totalPrice),
        expiredAt: data.expiredAt,
        paidAt: data.paidAt,
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findById(id: string): Promise<Order | null> {
    const data = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Order(
      {
        userId: data.userId,
        orderStatus: data.orderStatus as OrderStatus,
        totalPrice: Number(data.totalPrice),
        expiredAt: data.expiredAt,
        paidAt: data.paidAt,
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (order) =>
        new Order(
          {
            userId: order.userId,
            orderStatus: order.orderStatus as OrderStatus,
            totalPrice: Number(order.totalPrice),
            expiredAt: order.expiredAt,
            paidAt: order.paidAt,
          },
          order.id,
          order.createdAt,
          order.updatedAt
        )
    );
  }

  async findByStatus(status: string): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      where: { orderStatus: status as OrderStatus },
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (order) =>
        new Order(
          {
            userId: order.userId,
            orderStatus: order.orderStatus as OrderStatus,
            totalPrice: Number(order.totalPrice),
            expiredAt: order.expiredAt,
            paidAt: order.paidAt,
          },
          order.id,
          order.createdAt,
          order.updatedAt
        )
    );
  }

  async findExpired(): Promise<Order[]> {
    const now = new Date();
    const data = await this.prisma.order.findMany({
      where: {
        AND: [{ orderStatus: "PENDING" }, { expiredAt: { lt: now } }],
      },
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (order) =>
        new Order(
          {
            userId: order.userId,
            orderStatus: order.orderStatus as OrderStatus,
            totalPrice: Number(order.totalPrice),
            expiredAt: order.expiredAt,
            paidAt: order.paidAt,
          },
          order.id,
          order.createdAt,
          order.updatedAt
        )
    );
  }

  async findAll(): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return data.map(
      (order) =>
        new Order(
          {
            userId: order.userId,
            orderStatus: order.orderStatus as OrderStatus,
            totalPrice: Number(order.totalPrice),
            expiredAt: order.expiredAt,
            paidAt: order.paidAt,
          },
          order.id,
          order.createdAt,
          order.updatedAt
        )
    );
  }

  async update(order: Order): Promise<Order> {
    const data = await this.prisma.order.update({
      where: { id: order.id },
      data: {
        userId: order.userId,
        orderStatus: order.orderStatus,
        totalPrice: order.totalPrice,
        expiredAt: order.expiredAt,
        paidAt: order.paidAt,
        updatedAt: order.updatedAt,
      },
    });

    return new Order(
      {
        userId: data.userId,
        orderStatus: data.orderStatus as OrderStatus,
        totalPrice: Number(data.totalPrice),
        expiredAt: data.expiredAt,
        paidAt: data.paidAt,
      },
      data.id,
      data.createdAt,
      data.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
