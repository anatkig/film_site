import { useGetFilmByIdQuery } from "../../redux/slices/apiSlice";
import { useAppSelector } from "../../redux/store/hooks";

const FilmPage = () => {
  const id = useAppSelector((state) => state.mainSlice.id);

  const { data, error, isLoading } = useGetFilmByIdQuery(id);
  const film = data ? data : null;

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : film ? (
        <>
          <div>
            <h3>{film.title}</h3>
            <img src={film.poster_path} alt={film.title} />
          </div>
          ))
        </>
      ) : null}
    </>
  );
};

export default FilmPage;
