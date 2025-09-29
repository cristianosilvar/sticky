import { Movie } from "../core/domain/entities/movie-entity";

describe("Movie Entity", () => {
  it("should create a movie with valid data", () => {
    const movieProps = {
      title: "O Poderoso Chefão",
      synopsis: "Uma história sobre a família Corleone",
      rating: 9.5,
      durationMinutes: 175,
    };

    const movie = new Movie(movieProps);

    expect(movie.title).toBe("O Poderoso Chefão");
    expect(movie.synopsis).toBe("Uma história sobre a família Corleone");
    expect(movie.rating).toBe(9.5);
    expect(movie.durationMinutes).toBe(175);
  });

  it("should throw error when rating is invalid", () => {
    const movieProps = {
      title: "Filme Teste",
      synopsis: "Sinopse teste",
      rating: 11, // Rating inválido
      durationMinutes: 120,
    };

    expect(() => {
      const movie = new Movie(movieProps);
      movie.updateRating(11);
    }).toThrow("Rating deve estar entre 0 e 10");
  });

  it("should throw error when duration is invalid", () => {
    const movieProps = {
      title: "Filme Teste",
      synopsis: "Sinopse teste",
      rating: 8,
      durationMinutes: 120,
    };

    expect(() => {
      const movie = new Movie(movieProps);
      movie.updateDurationMinutes(0);
    }).toThrow("Duração deve ser maior que 0");
  });
});
