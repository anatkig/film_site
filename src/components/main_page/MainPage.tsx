import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetAllFilmsQuery } from "../../redux/slices/apiSlice";
import { putFilms } from "../../redux/slices/mainSlice";
import { SyntheticEvent } from "react";
import noposter from "../../assets/noposter.jpg";
import { useState } from "react";
import { useEffect } from "react";
import { FilmsArray } from "../../shared/types";

const MainPage = () => {
  const [films, setFilms] = useState<FilmsArray | undefined>();

  const dispatch = useDispatch();

  //gets films using RTK Query
  const { data, error, isLoading } = useGetAllFilmsQuery("movies");

  useEffect(() => {
    setFilms(data?.data);
    //puts films into the main Slice in the store because it is easier to work with
    if (!error) dispatch(putFilms(films));
  }, [data, error, dispatch, films]);

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
      ) : films ? (
        <>
          <div className="main-page-film-container">
            {films.map((film) => (
              <Link to={{ pathname: `/film_page/${film.id}` }} key={film.id}>
                <div>
                  <h3>{film.title}</h3>
                  <div>
                    <img
                      id="image"
                      src={film.poster_path}
                      onError={handleImageError}
                      alt={film.title}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default MainPage;
