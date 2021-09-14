import { Link } from "react-router-dom";
import { handleImageError } from "../../shared/reusableFunctions";
import { useGetAllFilmsQuery } from "../../redux/slices/apiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { putFilms } from "../../redux/slices/mainSlice";
import { useAppSelector } from "../../redux/store/hooks";

const MainPage = () => {
  //gets films using RTK Query
  const { data, error } = useGetAllFilmsQuery("movies");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      //puts films into the main Slice
      dispatch(putFilms(data?.data));
    }
  }, [data, error, dispatch]);

  const films = useAppSelector((state) => state.mainSlice.films);

  return (
    <div>
      {films && films.length !== 0 ? (
        <div className="main-page-film-container">
          {films.map((film) => (
            <Link to={{ pathname: `/${film.id}` }} key={film.id}>
              <div>
                <h3>{film.title}</h3>

                <img
                  id="image"
                  src={film.poster_path}
                  onError={handleImageError}
                  alt={film.title}
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        "Films are loading or there are no films satisfying the search request."
      )}
    </div>
  );
};

export default MainPage;
