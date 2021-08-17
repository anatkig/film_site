import { useGetAllFilmsQuery } from "../../redux/slices/apiSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeId } from "../../redux/slices/mainSlice";
import { SyntheticEvent } from "react";

const MainPage = () => {
  const { data, error, isLoading } = useGetAllFilmsQuery("movies");
  const films = data ? data.data : null;

  const dispatch = useDispatch();

  const handleIdSend = (id: number) => {
    dispatch(changeId(id));
  };

  const handleImageError = (event: SyntheticEvent) => {
    (event.target as HTMLImageElement).src =
      "https://lh3.googleusercontent.com/proxy/Hpu9bjpJqqhAcrc2_3CdpUgQKDQGHvgnLDm9gJ6CWQTHT7oypUUpwS1-IaNE5qGcKkCJSIvKyspyder7angC361V_YucT_pC9xqLmzwYBiw1ciVUaRUOL6oEufN_IjbgAgTG3T6CNCkjTl05kL4nKUMTB7-KksrU-sI3cJxdLvpl-RDetQ";
  };

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : films ? (
        <>
          <div className="filmContainer">
            {films.map((film) => (
              <Link to={`/film_page/${film.id}`}>
                <div onClick={() => handleIdSend(film.id)}>
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
