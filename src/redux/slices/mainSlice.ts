import { createSlice } from "@reduxjs/toolkit";
import { FilmState, FilmsArray } from "../../shared/types";

const initialState = {
  currentFilmid: 0,
  films: [] as FilmsArray[] | undefined,
} as FilmState;

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    //sets id of the film which will be displayed on film page
    putCurrentFilmId(state, action) {
      return { ...state, id: action.payload };
    },
    //saves films from API into the store
    putFilms(state, action) {
      return { ...state, films: action.payload };
    },
  },
});

export const { putCurrentFilmId, putFilms } = mainSlice.actions;
export default mainSlice.reducer;
