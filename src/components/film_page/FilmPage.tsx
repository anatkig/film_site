import { handleImageError } from "../../shared/reusableFunctions";
import { useParams } from "react-router";
import { FilmIdObj } from "../../shared/types";
import { useGetFilmByIdQuery } from "../../redux/slices/apiSlice";

const FilmPage = () => {
  //gets parameter of the film from the link (with id)
  const paramsFilmId = Number(useParams<FilmIdObj>().filmId);

  // the word "film" in required here. we cannot write "films" instead
  const { data } = useGetFilmByIdQuery(paramsFilmId);
  const films = data;
  return (
    <div>
      {films && Object.entries(films).length !== 0 ? (
        <div className="film-page-film-container">
          <img
            src={films.poster_path}
            onError={handleImageError}
            alt={films.title}
          />
          <div className="film-info">
            <h2>{films.title}</h2>
            <div>
              <b>Genres:</b>
              {films.genres &&
                films.genres.map((genre) => <span key={genre}>{genre}</span>)}
            </div>
            <div>
              <b>Release Date:</b>
              <span>{films.release_date}</span>
            </div>
            <div>
              <h4>Overview:</h4>
              {films.overview}
            </div>
          </div>
        </div>
      ) : (
        "No film was specified or it is still loading"
      )}
    </div>
  );
};

export default FilmPage;
