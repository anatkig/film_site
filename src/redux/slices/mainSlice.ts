import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilmState, FilmsArray } from "../../shared/types";

const initialState = {
  id: 0,
  films: [] as FilmsArray[] | undefined,
} as FilmState;

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeId(state, action) {
      return { ...state, id: action.payload };
    },
    putFilms(state, action) {
      return { ...state, films: action.payload };
    },
  },
});

export const { changeId, putFilms } = mainSlice.actions;
export default mainSlice.reducer;
