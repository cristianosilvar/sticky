export interface CreateShowtimeInput {
  date: Date;
  movieId: string;
  startAt: Date;
  status: string;
  basePrice: number;
}

export interface CreateShowtimeOutput {
  id: string;
  date: Date;
  movieId: string;
  startAt: Date;
  status: string;
  basePrice: number;
  createdAt: Date;
  updatedAt: Date;
}
