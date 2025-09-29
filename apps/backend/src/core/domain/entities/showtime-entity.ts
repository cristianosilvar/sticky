import { BaseEntity } from "./base";

export enum ShowtimeStatus {
  SCHEDULED = "SCHEDULED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ShowtimeProps {
  date: Date;
  movieId: string;
  startAt: Date;
  status: ShowtimeStatus;
  basePrice: number;
}

export class Showtime extends BaseEntity<ShowtimeProps> {
  constructor(
    props: ShowtimeProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt);
  }

  get date(): Date {
    return this.props.date;
  }

  get movieId(): string {
    return this.props.movieId;
  }

  get startAt(): Date {
    return this.props.startAt;
  }

  get status(): ShowtimeStatus {
    return this.props.status;
  }

  get basePrice(): number {
    return this.props.basePrice;
  }

  updateDate(date: Date): void {
    this.props.date = date;
    this.touch();
  }

  updateStartAt(startAt: Date): void {
    this.props.startAt = startAt;
    this.touch();
  }

  updateStatus(status: ShowtimeStatus): void {
    this.props.status = status;
    this.touch();
  }

  updateBasePrice(basePrice: number): void {
    if (basePrice < 0) {
      throw new Error("Preço base deve ser maior ou igual a 0");
    }
    this.props.basePrice = basePrice;
    this.touch();
  }

  isAvailable(): boolean {
    return this.status === ShowtimeStatus.SCHEDULED;
  }

  isOngoing(): boolean {
    return this.status === ShowtimeStatus.ONGOING;
  }

  isCompleted(): boolean {
    return this.status === ShowtimeStatus.COMPLETED;
  }

  isCancelled(): boolean {
    return this.status === ShowtimeStatus.CANCELLED;
  }
}
