import noposter from "../../assets/noposter.jpg";
import { SyntheticEvent } from "react";
import { useParams } from "react-router";
import { Film, FilmTitleObj } from "../../shared/types";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store/hooks";
import { putCurrentFilmTitle } from "../../redux/slices/mainSlice";
import { useEffect } from "react";

const FilmPage = () => {
  //fallback id
  const filmTitleFromStore = useAppSelector(
    (store) => store.mainSlice.currentFilmTitle
  );
  const films = useAppSelector((store) => store.mainSlice.films);

  //gets parameter of the film from the link (with id)
  const paramsFilmTitle = useParams<FilmTitleObj>().filmTitle;
  const [film, setFilm] = useState<Film>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!paramsFilmTitle) {
      setFilm(films?.find((film) => film.title === filmTitleFromStore));
    } else {
      setFilm(films?.find((film) => film.title === paramsFilmTitle));

      //this is useless right now. it could work with localStorage or backend
      dispatch(putCurrentFilmTitle(paramsFilmTitle));
    }
  }, [dispatch, paramsFilmTitle, filmTitleFromStore, films]);

  //some images don't load. this method loads the default image
  const handleImageError = (event: SyntheticEvent) => {
    (event.target as HTMLImageElement).src = `${noposter}`;
  };

  return (
    <>
      {film && Object.entries(film).length !== 0 ? (
        <>
          <div>
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
                    film.genres.map((genre) => (
                      <span key={genre}>{genre}</span>
                    ))}
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
          </div>
        </>
      ) : (
        "No film was specified"
      )}
    </>
  );
};

export default FilmPage;
