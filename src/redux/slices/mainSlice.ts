import { createSlice } from "@reduxjs/toolkit";
import { FilmState, FilmsArray } from "../../shared/types";

const initialState = {
  films: [] as FilmsArray[] | undefined,
} as FilmState;

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    //sets id of the film which will be displayed on film page
    putCurrentFilm(state, action) {
      return { ...state, currentFilm: action.payload };
    },
    //saves films from API into the store
    putFilms(state, action) {
      return { ...state, films: action.payload };
    },
  },
});

export const { putCurrentFilm, putFilms } = mainSlice.actions;
export default mainSlice.reducer;
