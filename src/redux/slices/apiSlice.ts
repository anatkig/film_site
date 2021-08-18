import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Film, Films } from "../../shared/types";

export const filmsApi = createApi({
  reducerPath: "filmsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reactjs-cdp.herokuapp.com/" }),
  endpoints: (builder) => ({
    getAllFilms: builder.query<Films, string>({
      query: (movies) => `/${movies}`,
    }),
    getFilmById: builder.query<Film, number>({
      query: (id) => `/movies/${id}`,
    }),
  }),
});

export const { useGetAllFilmsQuery, useGetFilmByIdQuery } = filmsApi;
