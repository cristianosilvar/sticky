export interface CreateMovieInput {
  title: string;
  synopsis: string;
  rating: number;
  durationMinutes: number;
}

export interface CreateMovieOutput {
  id: string;
  title: string;
  synopsis: string;
  rating: number;
  durationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}
