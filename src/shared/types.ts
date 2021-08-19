import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

export type Films = {
  data: [
    {
      id: number;
      title: string;
      tagline: string;
      vote_average: number;
      vote_cout: number;
      poster_path: string;
    }
  ];
};
export type FilmsArray = [
  {
    id: number;
    title: string;
    tagline: string;
    vote_average: number;
    vote_cout: number;
    poster_path: string;
  }
];
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
export interface FilmState {
  id: number;
  films: FilmsArray | undefined;
}

export type FilmIdObj = {
  filmId: string;
};
