import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Films, Film } from "../../shared/types";

export const filmsApi = createApi({
  reducerPath: "filmsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reactjs-cdp.herokuapp.com/" }),
  endpoints: (builder) => ({
    getAllFilms: builder.query<Films, string>({
      query: (movies) => `/${movies}`,
    }),
    getFilmsByTitle: builder.query<Films, string>({
      query: (title) => `/movies?search=${title}&&searchBy=title`,
    }),
    getFilmById: builder.query<Film, number>({
      query: (id) => `/movies/${id}`,
    }),
  }),
});

export const {
  useGetAllFilmsQuery,
  useGetFilmsByTitleQuery,
  useGetFilmByIdQuery,
} = filmsApi;
