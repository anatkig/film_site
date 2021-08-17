import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilmState } from "../../shared/types";

const initialState = { id: 0 } as FilmState;

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeId(state: FilmState, action: PayloadAction<number>) {
      return { ...state, id: action.payload };
    },
  },
});

export const { changeId } = mainSlice.actions;
export default mainSlice.reducer;
