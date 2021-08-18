import { createSlice } from "@reduxjs/toolkit";
import { FilmState, FilmsArray } from "../../shared/types";

const initialState = {
  id: 0,
  films: [] as FilmsArray[] | undefined,
} as FilmState;

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    //sets id of the film which will be displayed on film page
    changeId(state, action) {
      return { ...state, id: action.payload };
    },
    //saves films from API into the store
    putFilms(state, action) {
      return { ...state, films: action.payload };
    },
  },
});

export const { changeId, putFilms } = mainSlice.actions;
export default mainSlice.reducer;
