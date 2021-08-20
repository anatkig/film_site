import { useGetFilmByIdQuery } from "../../redux/slices/apiSlice";
import noposter from "../../assets/noposter.jpg";
import { SyntheticEvent } from "react";
import { useParams } from "react-router";
import { FilmIdObj } from "../../shared/types";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store/hooks";
import { putCurrentFilmId } from "../../redux/slices/mainSlice";
import { useEffect } from "react";

const FilmPage = () => {
  //fallback id
  const filmIdFromStore = useAppSelector(
    (store) => store.mainSlice.currentFilmid
  );

  //gets parameter of the film from the link (with id)
  const paramsFilmId = Number(useParams<FilmIdObj>().filmId);
  const [filmId, setFilmId] = useState<number>(paramsFilmId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!paramsFilmId) {
      setFilmId(filmIdFromStore);
    } else {
      setFilmId(paramsFilmId);

      //this is useless right now. it could work with localStorage or backend
      dispatch(putCurrentFilmId(paramsFilmId));
    }
  }, [dispatch, paramsFilmId, filmIdFromStore]);

  //loads the film based on id
  const { data, error, isLoading } = useGetFilmByIdQuery(filmId);
  const film = data ? data : null;

  //some images don't load. this method loads the default image
  const handleImageError = (event: SyntheticEvent) => {
    (event.target as HTMLImageElement).src = `${noposter}`;
  };

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : film && Object.entries(film).length !== 0 ? (
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
