import { useGetFilmByIdQuery } from "../../redux/slices/apiSlice";
import { useAppSelector } from "../../redux/store/hooks";
import noposter from "../../assets/noposter.jpg";
import { SyntheticEvent } from "react";

const FilmPage = () => {
  //gets id of the film from the store
  const filmId = useAppSelector((state) => state.mainSlice.id);

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
      ) : film ? (
        <>
          <div>
            <div className="film_page_film_container">
              <img
                src={film.poster_path}
                alt={film.title}
                onError={handleImageError}
              />
              <div className="film_info">
                <h2>{film.title}</h2>
                <div>
                  <b>Genres:</b>
                  {film.genres.map((genre) => (
                    <span>{genre}</span>
                  ))}
                </div>
                <div>
                  <b>Release Date:</b>
                  <span>{film.release_date}</span>
                </div>
                <p>
                  <h4>Overview:</h4>
                  {film.overview}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default FilmPage;
