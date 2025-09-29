export interface UpdateMovieInput {
  id: string;
  title?: string;
  synopsis?: string;
  rating?: number;
  durationMinutes?: number;
}

export interface UpdateMovieOutput {
  id: string;
  title: string;
  synopsis: string;
  rating: number;
  durationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}
