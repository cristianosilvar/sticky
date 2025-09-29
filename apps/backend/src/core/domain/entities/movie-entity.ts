import { BaseEntity } from "./base";

export interface MovieProps {
  title: string;
  synopsis: string;
  rating: number;
  durationMinutes: number;
}

export class Movie extends BaseEntity<MovieProps> {
  constructor(
    props: MovieProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt);
  }

  get title(): string {
    return this.props.title;
  }

  get synopsis(): string {
    return this.props.synopsis;
  }

  get rating(): number {
    return this.props.rating;
  }

  get durationMinutes(): number {
    return this.props.durationMinutes;
  }

  updateTitle(title: string): void {
    this.props.title = title;
    this.touch();
  }

  updateSynopsis(synopsis: string): void {
    this.props.synopsis = synopsis;
    this.touch();
  }

  updateRating(rating: number): void {
    if (rating < 0 || rating > 10) {
      throw new Error("Rating deve estar entre 0 e 10");
    }
    this.props.rating = rating;
    this.touch();
  }

  updateDurationMinutes(durationMinutes: number): void {
    if (durationMinutes <= 0) {
      throw new Error("Duração deve ser maior que 0");
    }
    this.props.durationMinutes = durationMinutes;
    this.touch();
  }
}
