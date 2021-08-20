export type Films = {
  data: Film[];
};

export type Film = {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_cout: number;
  poster_path: string;
  overview: string;
  genres: string[];
  runtime: number;
  budget: number;
  revenue: number;
  release_date: number;
};
export type FilmsArray = Film[];
export interface FilmState {
  currentFilm: Film;
  films: FilmsArray | undefined;
}

export type FilmIdObj = {
  filmId: string;
};
