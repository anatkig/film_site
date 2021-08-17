import { CombinedState } from "@reduxjs/toolkit";
import { filmsApi } from "./../redux/slices/apiSlice";

export interface FilmState {
  id: number;
}

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
export type Film = {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_cout: number;
  poster_path: string;
};
