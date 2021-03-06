import noposter from "../../assets/noposter.jpg";
import { useParams } from "react-router";
import { Film, FilmIdObj } from "../../shared/types";
import { SyntheticEvent } from "react";
import { useGetFilmByIdQuery } from "../../redux/slices/apiSlice";
import { useState } from "react";
import { useEffect } from "react";

const FilmPage = () => {
  const [film, setFilm] = useState<Film>();
  //gets parameter of the film from the link (with id)
  const paramsFilmId = Number(useParams<FilmIdObj>().filmId);

  const { data } = useGetFilmByIdQuery(paramsFilmId);

  useEffect(() => {
    setFilm(data);
  }, [data]);

  //some images don't load. this method loads the default image
  const handleImageError = (event: SyntheticEvent) => {
    (event.target as HTMLImageElement).src = `${noposter}`;
  };

  return (
    <>
      {film && Object.entries(film).length !== 0 ? (
        <div className="film-page-film-container">
          <img
            src={film.poster_path}
            alt={film.title}
            onError={handleImageError}
          />
          <div className="film-info">
            <h2>{film.title}</h2>
            <div>
              <b>Genres:</b>
              {film.genres &&
                film.genres.map((genre) => <span key={genre}>{genre}</span>)}
            </div>
            <div>
              <b>Release Date:</b>
              <span>{film.release_date}</span>
            </div>
            <div>
              <h4>Overview:</h4>
              {film.overview}
            </div>
          </div>
        </div>
      ) : (
        "No film was specified"
      )}
    </>
  );
};

export default FilmPage;
