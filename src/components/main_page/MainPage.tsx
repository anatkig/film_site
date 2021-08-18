import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetAllFilmsQuery } from "../../redux/slices/apiSlice";
import { changeId, putFilms } from "../../redux/slices/mainSlice";
import { SyntheticEvent } from "react";
import noposter from "../../assets/noposter.jpg";

const MainPage = () => {
  //get films using RTK Query
  const { data, error, isLoading } = useGetAllFilmsQuery("movies");
  const films = data ? data.data : null;

  const dispatch = useDispatch();

  //put films into the main Slice in the store because it is easier to work with
  if (!error) dispatch(putFilms(films));

  //sets id of the film for the film page
  const handleIdSendFilmId = (id: number) => {
    dispatch(changeId(id));
  };

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
              <Link to="/film-page">
                <div onClick={() => handleIdSendFilmId(film.id)}>
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
